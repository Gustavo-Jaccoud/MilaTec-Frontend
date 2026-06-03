import { yupResolver } from '@hookform/resolvers/yup';
import {
  createContext,
  startTransition,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import { useAuth } from '@/context/useAuthContext';
import { fetchProjects } from '@/services/projectService';
import { mapProjectsToKanban } from '@/utils/projectKanbanMapper';

const ThemeContext = createContext(undefined);

export const kanbanTaskSchema = yup.object({
  title: yup.string().required('Insira o título do projeto'),
  description: yup.string().required('Por favor insira a descrição do projeto'),
  totalTasks: yup.number().required('Insira o número de tarefas')
});
export const kanbanSectionSchema = yup.object({
  sectionTitle: yup.string().required('O título da seção é obrigatório')
});

const useKanbanContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useKanbanContext só pode ser usado dentro do KanbanProvider');
  }
  return context;
};

/**
 * @param {{ children: import('react').ReactNode, funnelVariant?: 'projects-api' | 'none' }} props
 */
const KanbanProvider = ({ children, funnelVariant = 'none' }) => {
  const { accessToken } = useAuth();
  const readOnly = funnelVariant === 'projects-api' || funnelVariant === 'none';
  const needsAuth = funnelVariant === 'projects-api' && !accessToken;

  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const hasLoadedRef = useRef(false);

  const loadProjects = async () => {
    if (!accessToken) {
      setError('Faça login para carregar o funil de projetos.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const list = await fetchProjects(accessToken);
      const arr = Array.isArray(list) ? list : [];
      const mapped = mapProjectsToKanban(arr);
      setSections(mapped.sections);
      setTasks(mapped.tasks);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar projetos');
      setSections([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const [activeSectionId, setActiveSectionId] = useState();
  const [activeTaskId, setActiveTaskId] = useState();
  const [taskFormData, setTaskFormData] = useState();
  const [sectionFormData, setSectionFormData] = useState();
  const [dialogStates, setDialogStates] = useState({
    showNewTaskModal: false,
    showSectionModal: false
  });

  const refetchKanban = useCallback(() => {
    hasLoadedRef.current = false;
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (funnelVariant !== 'projects-api') {
      setSections([]);
      setTasks([]);
      setLoading(false);
      setError(null);
      hasLoadedRef.current = false;
      return;
    }
    if (!accessToken) {
      setSections([]);
      setTasks([]);
      setLoading(false);
      setError(null);
      return;
    }
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadProjects();
    }
  }, [accessToken, funnelVariant, reloadKey]);

  const {
    control: newTaskControl,
    handleSubmit: newTaskHandleSubmit,
    reset: newTaskReset
  } = useForm({
    resolver: yupResolver(kanbanTaskSchema)
  });
  const {
    control: sectionControl,
    handleSubmit: sectionHandleSubmit,
    reset: sectionReset
  } = useForm({
    resolver: yupResolver(kanbanSectionSchema)
  });

  const emptySectionForm = useCallback(() => {
    sectionReset({
      sectionTitle: ''
    });
  }, [sectionReset]);

  const emptyTaskForm = useCallback(() => {
    newTaskReset({
      title: undefined,
      description: undefined,
      totalTasks: undefined
    });
  }, [newTaskReset]);

  const toggleNewTaskModal = (sectionId, taskId) => {
    if (readOnly) return;
    if (sectionId) setActiveSectionId(sectionId);
    if (taskId) {
      const foundTask = tasks.find((task) => task.id === taskId);
      if (foundTask) {
        newTaskReset({
          title: foundTask.title,
          description: foundTask.description
        });
        startTransition(() => {
          setActiveTaskId(taskId);
        });
        startTransition(() => {
          setTaskFormData(foundTask);
        });
      }
    }
    if (dialogStates.showNewTaskModal) emptyTaskForm();
    startTransition(() => {
      setDialogStates({
        ...dialogStates,
        showNewTaskModal: !dialogStates.showNewTaskModal
      });
    });
  };

  const toggleSectionModal = (sectionId) => {
    if (readOnly) return;
    if (sectionId) {
      const foundSection = sections.find((section) => section.id === sectionId);
      if (foundSection) {
        startTransition(() => {
          setSectionFormData(foundSection);
        });
        startTransition(() => {
          setActiveSectionId(foundSection.id);
        });
        sectionReset({
          sectionTitle: foundSection.title
        });
      }
    }
    if (dialogStates.showSectionModal) emptySectionForm();
    startTransition(() => {
      setDialogStates({
        ...dialogStates,
        showSectionModal: !dialogStates.showSectionModal
      });
    });
  };

  const getAllTasksPerSection = useCallback(
    (id) => tasks.filter((task) => task.sectionId == id),
    [tasks]
  );

  const getSectionTitle = useCallback(
    (id) => sections.find((section) => section.id === id)?.title ?? 'Sem etapa',
    [sections]
  );

  const tableRows = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        stage: getSectionTitle(task.sectionId),
        detailsPath: `/project/${encodeURIComponent(task.id)}`
      })),
    [getSectionTitle, tasks]
  );

  const handleNewTask = newTaskHandleSubmit((values) => {
    if (readOnly) return;
    const formData = {
      title: values.title,
      description: values.description,
      totalTasks: values.totalTasks
    };
    if (activeSectionId) {
      setTasks((prev) => {
        const last = prev.slice(-1)[0];
        const nextId = last && !Number.isNaN(Number(last.id)) ? `${Number(last.id) + 1}` : `local-${Date.now()}`;
        const newTask = {
          ...formData,
          priority: 'High',
          title: '',
          sectionId: activeSectionId,
          id: nextId,
          views: 0,
          members: [avatar1],
          share: 10,
          variant: 'success',
          commentsCount: 0
        };
        return [...prev, newTask];
      });
    }
    startTransition(() => {
      toggleNewTaskModal();
    });
    setActiveSectionId(undefined);
    newTaskReset();
  });

  const handleEditTask = newTaskHandleSubmit((values) => {
    if (readOnly) return;
    const formData = {
      title: values.title,
      description: values.description,
      totalTasks: values.totalTasks
    };
    if (activeSectionId && activeTaskId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTaskId
            ? {
                ...formData,
                views: 0,
                title: '',
                priority: 'High',
                members: [avatar1],
                share: 10,
                variant: 'success',
                sectionId: activeSectionId,
                id: activeTaskId,
                commentsCount: 0
              }
            : t
        )
      );
    }
    startTransition(() => {
      toggleNewTaskModal();
    });
    startTransition(() => {
      setActiveSectionId(undefined);
    });
    startTransition(() => {
      newTaskReset();
    });
    startTransition(() => {
      setTaskFormData(undefined);
    });
  });

  const handleDeleteTask = useCallback(
    (taskId) => {
      if (readOnly) return;
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    },
    [readOnly]
  );

  const onDragEnd = useCallback(
    (result) => {
      if (readOnly) return;
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      setTasks((prev) => {
        let sourceOccurrence = source.index;
        let destinationOccurrence = destination.index;
        let sourceId = 0;
        let destinationId = 0;
        prev.forEach((task, index) => {
          if (task.sectionId == source.droppableId) {
            if (sourceOccurrence == 0) {
              sourceId = index;
            }
            sourceOccurrence--;
          }
          if (task.sectionId == destination.droppableId) {
            if (destinationOccurrence == 0) {
              destinationId = index;
            }
            destinationOccurrence--;
          }
        });
        const task = prev[sourceId];
        const newTasks = prev.filter((t) => t.id != task.id);
        const moved = { ...task, sectionId: destination.droppableId };
        const parity = destination.droppableId != source.droppableId ? -1 : 0;
        return [...newTasks.slice(0, destinationId + parity), moved, ...newTasks.slice(destinationId + parity)];
      });
    },
    [readOnly]
  );

  const handleNewSection = sectionHandleSubmit((values) => {
    if (readOnly) return;
    setSections((prev) => {
      const last = prev.slice(-1)[0];
      const nextId = last && !Number.isNaN(Number(last.id)) ? `${Number(last.id) + 1}` : `local-${Date.now()}`;
      return [...prev, { id: nextId, title: values.sectionTitle }];
    });
    startTransition(() => {
      toggleSectionModal();
    });
    sectionReset();
  });

  const handleEditSection = sectionHandleSubmit((values) => {
    if (readOnly) return;
    if (activeSectionId) {
      setSections((prev) =>
        prev.map((section) =>
          section.id === activeSectionId ? { id: activeSectionId, title: values.sectionTitle } : section
        )
      );
    }
    startTransition(() => {
      toggleSectionModal();
    });
    sectionReset();
  });

  const handleDeleteSection = useCallback(
    (sectionId) => {
      if (readOnly) return;
      setSections((prev) => prev.filter((section) => section.id !== sectionId));
    },
    [readOnly]
  );

  const value = {
    sections,
    activeSectionId,
    taskFormData,
    sectionFormData,
    newTaskModal: {
      open: dialogStates.showNewTaskModal,
      toggle: toggleNewTaskModal
    },
    sectionModal: {
      open: dialogStates.showSectionModal,
      toggle: toggleSectionModal
    },
    taskForm: {
      control: newTaskControl,
      newRecord: handleNewTask,
      editRecord: handleEditTask,
      deleteRecord: handleDeleteTask
    },
    sectionForm: {
      control: sectionControl,
      newRecord: handleNewSection,
      editRecord: handleEditSection,
      deleteRecord: handleDeleteSection
    },
    getAllTasksPerSection,
    getSectionTitle,
    tasks,
    tableRows,
    onDragEnd,
    loading,
    error,
    readOnly,
    needsAuth,
    refetchKanban,
    funnelVariant
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { KanbanProvider, useKanbanContext };

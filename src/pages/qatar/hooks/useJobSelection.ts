
import { useJobActions } from './job-schedule/useJobActions';
import { useScheduleState } from './job-schedule/useScheduleState';
import { useScheduleActions } from './job-schedule/useScheduleActions';

export const useJobSelection = () => {
  const {
    selectedJobs,
    setSelectedJobs,
    toggleJobSelection,
    handleCloseJobs
  } = useJobActions();

  const {
    isPrintMode,
    setIsPrintMode,
    isEditMode,
    setIsEditMode,
    scheduleData,
    setScheduleData
  } = useScheduleState(selectedJobs);

  const {
    handleScheduleEdit,
    handleScheduleSave,
    handleScheduleSubmit,
    handleBackFromPrint,
    handleDirectPrint
  } = useScheduleActions(
    selectedJobs,
    scheduleData,
    setScheduleData,
    setIsPrintMode,
    setIsEditMode
  );

  return {
    selectedJobs,
    setSelectedJobs,
    isPrintMode,
    setIsPrintMode,
    isEditMode,
    setIsEditMode,
    scheduleData,
    setScheduleData,
    toggleJobSelection,
    handleScheduleSubmit,
    handleScheduleEdit,
    handleScheduleSave,
    handleBackFromPrint,
    handleCloseJobs,
    handleDirectPrint
  };
};

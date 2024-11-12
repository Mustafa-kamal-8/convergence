import AddAssesmentModal from "./add-assesment-modal";
import AddAssessorModal from "./add-assessor-modal";
import AddBatchModal from "./add-batch-modal";
import AddCourseModal from "./add-course-modal";
import AddDepartmentLoginModal from "./add-department-login";
import AddInvoiceModal from "./add-invoice-modal";
import AddPlacementModal from "./add-placement-modal";
import AddProfileModal from "./add-profile-modal";
import AddSchemeModal from "./add-scheme-modal";
import AddTargetModal from "./add-target-modal";
import AddTcModal from "./add-tc-modal";
import AddTpModal from "./add-tp-modal";
import AddTrainerModal from "./add-trainer-modal";
import FileUploadAndPreviewModal from "./file-upload-modal";

export default function Modals() {
  return (
    <>
      <AddTargetModal />
      <AddTpModal />
      <AddTcModal />
      <AddCourseModal />
      <AddProfileModal />
      <AddAssesmentModal />
      <AddPlacementModal />
      <AddSchemeModal />
      <AddBatchModal />

      <AddAssessorModal />
      <AddTrainerModal />
      <AddInvoiceModal />

      {/* admin */ }
      <AddDepartmentLoginModal />

      <FileUploadAndPreviewModal />
    </>
  );
}

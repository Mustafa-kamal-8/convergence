import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const targetTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "sanctionNo",
    header: "Sanction No",
  },
  {
    accessorKey: "schemeCode",
    header: "Scheme Code",
  },
  {
    accessorKey: "sanctionDate",
    header: "Sanction Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "totalTarget",
    header: "Total Target",
  },
];

export const tpTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "tpId",
    header: "TP Id",
  },
  {
    accessorKey: "tpName",
    header: "Tp Name",
  },
  {
    accessorKey: "tpSpocEmail",
    header: "SPOC Email",
  },
  {
    accessorKey: "tpSpocMobile",
    header: "SPOC Mobile",
  },
  {
    accessorKey: "tpSpocName",
    header: "SPOC Name",
  },
  {
    accessorKey: "tpSmartId",
    header: "Smart ID",
  },
  {
    accessorKey: "tpState",
    header: "State",
  },
  {
    accessorKey: "tpDistrict",
    header: "District",
  },
  {
    accessorKey: "tpBlock",
    header: "Block",
  },
  {
    accessorKey: "tpVillage",
    header: "Village",
  },

  {
    accessorKey: "tpAddress",
    header: "Tp Address",
  },
];

export const tcTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "tpId",
    header: "TP ID",
  },
  {
    accessorKey: "tcPatnerCode",
    header: "Patner Code",
  },
  {
    accessorKey: "tcCenterName",
    header: "Center Name",
  },
  {
    accessorKey: "tcCenterId",
    header: "Center ID",
  },
  {
    accessorKey: "tcSpocEmail",
    header: "SPOC Email",
  },
  {
    accessorKey: "tcSpocName",
    header: "SPOC Name",
  },

  {
    accessorKey: "tcState",
    header: "State",
  },
  {
    accessorKey: "tcDistrict",
    header: "District",
  },
  {
    accessorKey: "tcBlock",
    header: "Block",
  },
  {
    accessorKey: "tcVillage",
    header: "Village",
  },
  {
    accessorKey: "tcAddress",
    header: "Address",
  },
  {
    accessorKey: "tcConsituency",
    header: "Constituency",
  },
  {
    accessorKey: "tcSmartId",
    header: "Smart Id",
  },
];

export const courseTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "dateValidFrom",
    header: "Date Valid From",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "dateValidUpto",
    header: "Date valid upto",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "sectorName",
    header: "Sector Name",
  },
  {
    accessorKey: "qpnosCode",
    header: "QPNOS Code",
  },
  {
    accessorKey: "totalTheoryHours",
    header: "Total Theory Hours",
  },
  {
    accessorKey: "totalPraticalHours",
    header: "Total Pratical Hours",
  },
  {
    accessorKey: "jobRoleName",
    header: "Job Role",
  },
];

export const assesmentTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "batchId",
    header: "Batch Id",
  },
  {
    accessorKey: "sdmsBatchId",
    header: "SDMS Batch Id",
  },
  {
    accessorKey: "candidateId",
    header: "Candidate Id",
  },
  {
    accessorKey: "assesed",
    header: "Assessed",
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? "Assessed" : "Not Assessed";
    },
  },
  {
    accessorKey: "assesmentDate",
    header: "Assesment Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "assesmentAgency",
    header: "Assesment Agency",
  },
  {
    accessorKey: "assesmentAgencyMobile",
    header: "Assesment Agency Mobile",
  },
  {
    accessorKey: "assesmentAgencyEmail",
    header: "Assesment Agency Email",
  },
  {
    accessorKey: "assessorId",
    header: "Assessor ID",
  },
  {
    accessorKey: "assessorName",
    header: "Assessor User Name",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
  {
    accessorKey: "resultDate",
    header: "Result Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "certificationStatus",
    header: "Certification Status",
  },
  {
    accessorKey: "totalMarks",
    header: "Total Marks",
  },
  {
    accessorKey: "obtainedMarks",
    header: "Obtained Marks",
  },
];

export const placementTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "batchId",
    header: "Batch Id",
  },
  {
    accessorKey: "candidateId",
    header: "Candidate Id",
  },
  {
    accessorKey: "isCandidatePlaced",
    header: "Candidate Placed",
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? "Placed" : "Not Placed";
    },
  },
  {
    accessorKey: "employerName",
    header: "Employeer Name",
  },
  {
    accessorKey: "placementType",
    header: "Placement Type",
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? val.split("_").join(" ") : "";
    },
  },
  {
    accessorKey: "employerContactNo",
    header: "Employer Contact No",
  },
  {
    accessorKey: "placementDistrict",
    header: "Placement District",
  },
  {
    accessorKey: "placementState",
    header: "Placement State",
  },
  {
    accessorKey: "monthlySalary",
    header: "Monthly Salary",
  },
];

export const profileTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "batchId",
    header: "Batch ID",
  },
  {
    accessorKey: "candidateID",
    header: "Candidate ID",
  },
  {
    accessorKey: "candidateName",
    header: "Candidate Name",
  },
  {
    accessorKey: "fatherName",
    header: "Father Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  { accessorKey: "IDType", header: "ID Type" },
  { accessorKey: "IDNumber", header: "ID Number" },
  { accessorKey: "religion", header: "Religion" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "mobileNo", header: "Mobile No" },
  { accessorKey: "emailAddress", header: "Email" },
  { accessorKey: "educationAttained", header: "Education" },
  {
    accessorKey: "ilsDisability",
    header: "Disability",
    cell: ({ getValue }) => {
      return getValue() ? "YES" : "NO";
    },
  },
  {
    accessorKey: "iIsTeaTribe",
    header: "Tea Tribe",
    cell: ({ getValue }) => {
      return getValue() ? "YES" : "NO";
    },
  },
  {
    accessorKey: "iIsBPLCardHolder",
    header: "BPL Card",
    cell: ({ getValue }) => {
      return getValue() ? "YES" : "NO";
    },
  },
  {
    accessorKey: "iIsMinority",
    header: "Minority",
    cell: ({ getValue }) => {
      return getValue() ? "YES" : "NO";
    },
  },
  { accessorKey: "candidateResidentialAddress", header: "Residential Address" },
  {
    accessorKey: "candidateResidentialDistrict",
    header: "Residential District",
  },
  { accessorKey: "candidateResidentialBlock", header: "Residential Block" },
  { accessorKey: "candidateResidentialULB", header: "Residential ULB" },
  {
    accessorKey: "candidateResidentialVillageCity",
    header: "Residential Village/City",
  },
  {
    accessorKey: "candidateResidentialPostOffice",
    header: "Residential Post Office",
  },
  {
    accessorKey: "candidateResidentialPoliceStation",
    header: "Residential Police Station",
  },
  {
    accessorKey: "candidateResidentialPINCode",
    header: "Residential Pin Code",
  },
  {
    accessorKey: "candidateResidentialCouncilContituency",
    header: "Residential Council Contitucency",
  },
  {
    accessorKey: "candidateResidentialAssemblyContituency",
    header: "Residential Assembly Contituency",
  },
  { accessorKey: "candidatePermanentAddress", header: "Permanent Address" },
  { accessorKey: "candidatePermanentDistrict", header: "Permanent District" },
  { accessorKey: "candidatePermanentBlock", header: "Permanent Block" },
  { accessorKey: "candidatePermanentULB", header: "Permanent ULB" },
  {
    accessorKey: "candidatePermanentVillageCity",
    header: "Permanent Village/City",
  },
  {
    accessorKey: "candidatePermanentPostOffice",
    header: "Permanent Post Office",
  },
  {
    accessorKey: "candidatePermanentPoliceStation",
    header: "Permanent Police Station",
  },
  { accessorKey: "candidatePermanentPINCode", header: "Permanent Pin Code" },
  {
    accessorKey: "candidatePermanentCouncilContituency",
    header: "Permanent Council Contituency",
  },
  {
    accessorKey: "candidatePermanentAssemblyContituency",
    header: "Permanent Assembly Contituency",
  },
  { accessorKey: "candidateBankAccountHolderName", header: "Bank Holder Name" },
  { accessorKey: "candidateBankAccountNumber", header: "Bank Account Number" },
  { accessorKey: "candidateBankName", header: "Bank Name" },
  { accessorKey: "candidateBankIFSC", header: "Bank IFSC" },
];

export const schemeTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "schemeFundingType",
    header: "Scheme Funding Type",
  },
  {
    accessorKey: "schemeFundingRatio",
    header: "Scheme Funding Ratio",
  },
  {
    accessorKey: "sanctionOrderNo",
    header: "Sanction Order No.",
  },
  {
    accessorKey: "dateOfSanction",
    header: "Sanction Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "schemeType",
    header: "Scheme Type",
  },
  {
    accessorKey: "fundName",
    header: "Fund Name",
  },
  {
    accessorKey: "scheme",
    header: "Scheme",
  },
  {
    accessorKey: "schemeCode",
    header: "Scheme Code",
  },
];

export const batchTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "batchId",
    header: "Batch Id",
  },
  {
    accessorKey: "sdmsBatchId",
    header: "SDMS Batch Id",
  },
  {
    accessorKey: "batchStartDate",
    header: "Batch Start Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "batchEndDate",
    header: "Batch End Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "sectorName",
    header: "Sector Name",
  },
  {
    accessorKey: "qpnosCode",
    header: "QPNOS Code",
  },
  {
    accessorKey: "jobRoleName",
    header: "Job Role Name",
  },
  {
    accessorKey: "tpName",
    header: "TP Name",
  },
  {
    accessorKey: "tcPartnerCode",
    header: "TC Partner Code",
  },
  {
    accessorKey: "trainerId",
    header: "Trainer Id",
  },
];

export const assessorTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "assessorId",
    header: "Assessor Id",
  },
  {
    accessorKey: "assessorName",
    header: "Assessor Name",
  },
  {
    accessorKey: "assessorEmail",
    header: "Assessor Email",
    cell: ({ getValue }) => {
      return <span className="normal-case">{getValue()}</span>;
    },
  },
  {
    accessorKey: "assessorMobile",
    header: "Assessor Mobile",
  },
  {
    accessorKey: "assesmentAgency",
    header: "Assessment Agency",
  },
  {
    accessorKey: "validaUpTo",
    header: "Valid Up To",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
];

export const trainerTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "trainerId",
    header: "Trainer Id",
  },
  {
    accessorKey: "trainerName",
    header: "Trainer Name",
  },
  {
    accessorKey: "trainerEmail",
    header: "Trainer Email",
  },
  {
    accessorKey: "trainerMobile",
    header: "Trainer Mobile",
  },
  {
    accessorKey: "pancard",
    header: "Pancard",
  },
];

export const invoiceTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "batchId",
    header: "Batch Id",
  },
  {
    accessorKey: "invoiceType",
    header: "Invoice Type",
  },
  {
    accessorKey: "invoiceTranche",
    header: "Invocie Tranche",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      return moment(getValue()).local().format("D/MM/YYYY");
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "noOfCandidates",
    header: "No Of Candidates",
  },
];

import { Access } from "./Access";

/**only read document */
export const AccessGuest:Access[]=[];

/**Have Guest acces and can read chat, annotation, draw and download doccument */
export const AccesViewer=[
  ...AccessGuest,
  Access.Read,
];

/** Have Viewer acces + can reply */
export const AccessMember=[
  ...AccesViewer,
  Access.Reply,
  Access.DownloadDoc,
  Access.DownloadDocWithAnnotation
];

export const AccesManager=[
  ...AccessMember,
  Access.Create,
  Access.Delete,
  Access.Update,
];

/** Have Member acces + Crud Any + Validate It */
export const AccesAdmin=[
  ...AccesManager,
  Access.DeleteAny,
  Access.UpdateAny,
  Access.ValidateTask,
  Access.ApproveDoc,
  Access.ManagePeopleInDoc
];

/** Have Member acces Can Approve Document */
export const AccesApprover=[
  ...AccessMember,
  Access.ValidateTask,
  Access.ApproveDoc,
];
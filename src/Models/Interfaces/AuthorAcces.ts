import { Validation } from "./Type";

/**only read document */
export const AccessGuest:Validation.AuthorHasAccess[]=[];

/**Have Guest acces and can read chat, annotation, draw and download doccument */
export const AccesViewer=[
  ...AccessGuest,
  Validation.AuthorHasAccess.Read,
];

/** Have Viewer acces + can reply */
export const AccessMember=[
  ...AccesViewer,
  Validation.AuthorHasAccess.Reply,
  Validation.AuthorHasAccess.DownloadDoc,
  Validation.AuthorHasAccess.DownloadDocWithAnnotation
];

export const AccesManager=[
  ...AccessMember,
  Validation.AuthorHasAccess.Create,
  Validation.AuthorHasAccess.Delete,
  Validation.AuthorHasAccess.Update,
];

/** Have Member acces + Crud Any + Validate It */
export const AccesAdmin=[
  ...AccesManager,
  Validation.AuthorHasAccess.DeleteAny,
  Validation.AuthorHasAccess.UpdateAny,
  Validation.AuthorHasAccess.ValidateTask,
  Validation.AuthorHasAccess.ApproveDoc,
  Validation.AuthorHasAccess.ManagePeopleInDoc
];

/** Have Member acces Can Approve Document */
export const AccesApprover=[
  ...AccessMember,
  Validation.AuthorHasAccess.ValidateTask,
  Validation.AuthorHasAccess.ApproveDoc,
];
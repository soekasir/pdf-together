export enum Access{
  /**can Delete on own Annotation/Draw */
  Delete="Delete",

  /**can Update on own Annotation/Draw */
  Update="update",

  /**can Create Annotation/Draw */
  Create="Create",

  /**can Read Annotation/Draw and Reply */
  Read="Read",

  /**can Reply, also Update and Delete on Own Reply */
  Reply="Reply",

  /**can Delete on other Annotation/Draw */
  DeleteAny="DeleteAny",

  /**can Update and Delete on other Annotation/Draw */
  UpdateAny="UpdateAny",

  /**can Validate Task/Annotation */
  ValidateTask="ValidateTask",

  /**can Approve Document */
  ApproveDoc="ApproveDoc",

  /**can download document */
  DownloadDoc="DownloadDocument",

  /**can download document with all annotation */
  DownloadDocWithAnnotation="DownloadDocumentWithAnnotation",

  /** can manage people in documment */
  ManagePeopleInDoc="ManagePeopleInDoc"
}

export type ArrayAcces=Access[];

/**
 * This Just Example or Default Settings Access
 */

/**only read document */
export const AccessGuest:ArrayAcces=[];

/**Have Guest acces and can read chat, annotation, draw and download doccument */
export const AccesViewer=[
  ...AccessGuest,
  Access.Read,
  Access.DownloadDoc,
];

/** Have Viewer acces + can reply */
export const AccessMember=[
  ...AccesViewer,
  Access.Reply,
  Access.DownloadDocWithAnnotation
];

/** Have Member acces + Crud Any + Validate It */
export const AccesManager=[
  ...AccessMember,
  Access.Create,
  Access.Delete,
  Access.Update,
];

/** Have Manager acces + can delete-update any content,
 * also can validate, aprrove, dan manage user in doc,
 */
export const AccesAdmin=[
  ...AccesManager,
  Access.DeleteAny,
  Access.UpdateAny,
  Access.ValidateTask,
  Access.ApproveDoc,
  Access.ManagePeopleInDoc
];

/** Have Member acces, Can Approve Document */
export const AccesApprover=[
  ...AccessMember,
  Access.ValidateTask,
  Access.ApproveDoc,
];
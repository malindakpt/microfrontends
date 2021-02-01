export interface ActionData {
  /** Id of the action clicked, should be unique. */
  actionId: string;
  /** The label of the action. */
  label: string;
  /** If set to true, the action will require confirmation. */
  confirmationRequired?: boolean;
}

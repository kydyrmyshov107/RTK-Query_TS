/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace CRUD {
  type GetCrudRequest = void;
  type GetCrudResponse = {
    _id?: number;
    firstName: string;
    lastName: string;
  }[];

  type CreateCrudRequest = {
    _id?: number;
    firstName: string;
    lastName: string;
  };
  type CreateCrudResponse = {
    _id?: number;
    firstName: string;
    lastName: string;
  }[];
  type CreateCrudRequestDelete = number;
  type CreateCrudResponseDelete = {
    _id: number;
  };
  type CreateCrudRequestPatch = {
    _id: number;
    newData: string;
  };
  type CreateCrudResponsePatch = {
    _id: number;
    newData: string;
  };
}

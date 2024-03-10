import { CRUD } from "./types";
import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<CRUD.GetCrudResponse, CRUD.GetCrudRequest>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["crud"],
    }),
    createTodo: builder.mutation<
      CRUD.CreateCrudResponse,
      CRUD.CreateCrudRequest
    >({
      query: ({ firstName, lastName }) => ({
        url: "",
        method: "POST",
        body: { firstName, lastName },
      }),
      invalidatesTags: ["crud"],
    }),
    deleteTodo: builder.mutation<
      CRUD.CreateCrudRequestDelete,
      CRUD.CreateCrudResponseDelete
    >({
      query: (_id) => ({
        url: `${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["crud"],
    }),
    patchTodo: builder.mutation<
      CRUD.CreateCrudRequestPatch,
      CRUD.CreateCrudResponsePatch
    >({
      query: ({ _id, newData }) => ({
        url: `${_id}`,
        method: "PATCH",
        body: newData,
      }),
      invalidatesTags: ["crud"],
    }),
  }),
});
export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  usePatchTodoMutation,
} = api;

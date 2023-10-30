import { UseMutationOptions, useMutation } from "react-query";
import { IComment } from "/imports/types/IComment";
import callAsync from "/imports/utils/call-async";

export const useAddComment = (
    options?: UseMutationOptions<any, unknown, IComment, any>
  ) => {
    return useMutation<any, any, IComment, any>(
      ["comments.post"],
      async (comment) => await callAsync("comments.post", comment),
      {
        ...options,
      }
    );
  };

  export const useDeleteComment = (
    options?: UseMutationOptions<any, unknown, string, any>
  ) => {
    return useMutation<any, any, string, any>(
      ["comments.remove"],
      async (comment) => await callAsync("comments.remove", comment),
      {
        ...options,
      }
    );
  };
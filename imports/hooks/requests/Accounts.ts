import { UseMutationOptions, useMutation } from "react-query";
import callAsync from "/imports/utils/call-async";
import loginAsync from "/imports/utils/login-async";

export const useRegisterUser = (
  options?: UseMutationOptions<any, unknown, any, unknown>
) => {
  return useMutation<any, any, any, any>(
    ["accounts.create"],
    async (user) => {
      return await callAsync("accounts.create", user);
    },
    {
      ...options,
    }
  );
};

export const useLoginUser = (
  options?: UseMutationOptions<any, unknown, any, unknown>
) => {
  return useMutation<any, any, any, any>(["login"], (user) => loginAsync(user), {
    ...options,
  });
};

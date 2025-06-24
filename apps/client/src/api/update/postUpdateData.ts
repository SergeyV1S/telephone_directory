export interface IPostUpdateDataResponse {
  success: boolean;
}

// export const postUpdateData = async (prevState: unknown, formData: FormData) =>
//   api.post("https://jsonplaceholder.typicode.com", formData.get("files"), {
//     headers: {
//       Authorization: `Bearer ${formData.get("password")}`,
//       "Content-Type": "multipart/form-data"
//     }
//   });

export const postUpdateData = async (prevState: unknown, formData: FormData) => {
  console.log(formData.get("password"), formData.get("files"));
  return {
    success: true
  };
};

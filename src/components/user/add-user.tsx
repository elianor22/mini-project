"use client";
import InputField from "@/components/ui/Forms/InputField/InputField";
import { BaseService } from "@/service/base.service";
import { IResponseUser } from "@/types/response/users";
import { IFormUser } from "@/types/user";
import { userValidationSchema } from "@/validations/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const createUser = async (payload: IFormUser) => {
  const service = new BaseService("/user");
  const response = await service.post(payload);
  const data: IResponseUser = await response;

  return data;
};

const AddUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IFormUser>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(userValidationSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onCreate = async (form: IFormUser) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    mutate(form, {
      onSuccess: () => {
        setOpen(false);
        reset();
        router.refresh();
        alert("success create user");
      },
      onError: () => alert("failed to create user"),
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <form onSubmit={handleSubmit(onCreate)}>
            <InputField
              name="name"
              control={control}
              errors={errors}
              label="Name"
              placeholder="Jhon Doe"
            />
            <InputField
              name="email"
              control={control}
              errors={errors}
              label="Email"
              placeholder="jhon.doe@mail.com"
            />
            <InputField
              name="password"
              control={control}
              errors={errors}
              label="Password"
              type="password"
            />
            <InputField
              name="confirmPassword"
              control={control}
              errors={errors}
              label="Confirm Password"
              type="password"
            />
            {/* <Checkbox name="isDefaultPassword" control={control} /> */}
            <DialogActions>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddUser;

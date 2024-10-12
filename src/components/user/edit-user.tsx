import InputField from "@/components/ui/Forms/InputField/InputField";
import { BaseService } from "@/service/base.service";
import { IResponseUser } from "@/types/response/users";
import { IUser } from "@/types/user";
import { userUpdateValidationSchema } from "@/validations/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type IFormUser = {} & IUser;

const editUser = async (payload: IFormUser) => {
  const service = new BaseService("/user");
  const response: IResponseUser = await service.patch(payload.id, payload);
  return response;
};

const EditUser = ({ data }: { data: IUser }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IFormUser>({
    defaultValues: {
      ...data,
    },
    resolver: zodResolver(userUpdateValidationSchema),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const { mutate } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: editUser,
  });
  const onCreate = async (form: IFormUser) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const payload = {
      ...data,
      ...form,
    };
    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
      onError: () => alert("Failed to edit user"),
    });
  };

  useEffect(() => {
    reset(data);
  }, [data, reset]);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Edit />
      </IconButton>
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
            {/* <Checkbox name="isDefaultPassword" control={control} /> */}
            <DialogActions>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditUser;

import { BaseService } from "@/service/base.service";
import { IUser } from "@/types/user";
import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const deleteUser = async (payload: string) => {
  const service = new BaseService("/user");
  const response = await service.delete(payload);
  return response;
};

const DeleteUser = ({ data }: { data: IUser }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };
  const { mutate } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: deleteUser,
  });
  const onDelete = async () => {
    mutate(data.id, {
      onSuccess: () => {
        router.refresh();
        setOpen(false);
      },
      onError: () => alert("Failed to delete user"),
    });
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography>
            Delete user <strong>{data.name}</strong> ?
          </Typography>
          <Stack flexDirection="row" justifyContent="center" gap={3}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={onDelete}>
              Yes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DeleteUser;

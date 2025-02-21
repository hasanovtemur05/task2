/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  DialogTrigger,
  Modal,
  Dialog,
  Heading,
  TextField,
  Label,
  Input,
} from "react-aria-components";
import GlobalTable from "../../../components/table";
import { useGetData } from "../hooks/queries";
import {
  useCreatePosts,
  useUpdatePosts,
  useDeletePosts,
} from "./../hooks/mutation"; 

const Index = () => {
  const { data, isLoading, error } = useGetData();
  const { mutate: createPost } = useCreatePosts();
  const { mutate: updatePost } = useUpdatePosts();
  const { mutate: deletePost } = useDeletePosts();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [modalType, setModalType] = useState<"create" | "update">("create");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1); 

  useEffect(() => {
    if (modalType === "update" && selectedRow) {
      setTitle(selectedRow.title);
      setBody(selectedRow.body);
      setUserId(selectedRow.userId);
    } else {
      setTitle("");
      setBody("");
      setUserId(1);
    }
  }, [modalType, selectedRow]);

  if (isLoading)
    return (
      <p className="text-center text-[40px] text-green-500 mt-[300px]">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-[40px] text-red-500 mt-[300px]">
        Error loading data!
      </p>
    );

  const rows = data || [];

  const openModal = (type: "create" | "update", row?: any) => {
    setModalType(type);
    setSelectedRow(row || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
    setTitle("");
    setBody("");
    setUserId(1);
  };

  const handleCreate = () => {
    createPost({ title, body, userId }, { onSuccess: closeModal });
  };

  const handleUpdate = () => {
    if (!selectedRow) return;
    updatePost(
      { id: selectedRow.id, data: { title, body, userId } },
      { onSuccess: closeModal }
    );
  };

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  const columns = [
    { id: "id", title: "ID", isRowHeader: true },
    { id: "title", title: "Title" },
    { id: "body", title: "Body" },
    { id: "userId", title: "User ID" },
    {
      id: "action",
      title: "Action",
      key: "action",
      render: (row: any) => (
        <MenuTrigger>
          <Button aria-label="Menu">☰</Button>
          <Popover>
            <Menu>
              <MenuItem onAction={() => openModal("create")}>Create</MenuItem>
              <MenuItem onAction={() => openModal("update", row)}>Update</MenuItem>
              <MenuItem onAction={() => handleDelete(row.id)}>Delete</MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Home</h1>
      <GlobalTable columns={columns} rows={rows} />

      {isOpen && (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal
            isDismissable
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <Dialog className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <Heading slot="title">
                {modalType === "create" ? "Create Post" : "Update Post"}
              </Heading>
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField autoFocus>
                  <Label>Title:</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </TextField>
                <TextField>
                  <Label>Body:</Label>
                  <Input
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </TextField>
                <TextField>
                  <Label>User ID:</Label>
                  <Input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                  />
                </TextField>

                <Button
                  slot="close"
                  onPress={modalType === "create" ? handleCreate : handleUpdate}
                >
                  {modalType === "create" ? "Create" : "Update"}
                </Button>
              </form>
            </Dialog>
          </Modal>
        </DialogTrigger>
      )}
    </div>
  );
};

export default Index;

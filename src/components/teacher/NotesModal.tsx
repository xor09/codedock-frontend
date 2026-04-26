import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
};

export default function NotesModal({ isOpen, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    title: "",
    type: "NOTES", // NOTES | HOMEWORK
    description: "",
  });

  const handleSave = () => {
    onSave(form);

    setForm({
      title: "",
      type: "NOTES",
      description: "",
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Notes / Homework</ModalHeader>

        <ModalBody>
          <Input
            placeholder="Title"
            mb={3}
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Select
            mb={3}
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="NOTES">Notes</option>
            <option value="HOMEWORK">Homework</option>
          </Select>

          <Textarea
            placeholder="Description / Content"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button bg="#00e066" color="black" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
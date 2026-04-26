import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter,
  Button, Input
} from "@chakra-ui/react";
import { useState } from "react";

export default function AssignmentModal({ isOpen, onClose, onSubmit }: any) {
  const [form, setForm] = useState({
    student: "",
    title: "",
    status: "Pending",
    feedback: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Assignment</ModalHeader>

        <ModalBody>
          <Input placeholder="Student"
            onChange={(e) => setForm({ ...form, student: e.target.value })}
          />
          <Input mt={3} placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button ml={2} onClick={() => onSubmit(form)}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
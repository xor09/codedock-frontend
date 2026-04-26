import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter,
  Button, Input
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddStudentModal({ isOpen, onClose, onSubmit }: any) {
  const [form, setForm] = useState({ name: "", course: "" });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Student</ModalHeader>

        <ModalBody>
          <Input placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input mt={3} placeholder="Course"
            onChange={(e) => setForm({ ...form, course: e.target.value })}
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
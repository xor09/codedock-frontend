import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter,
  Button, Input
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddCourseModal({ isOpen, onClose, onSubmit }: any) {
  const [form, setForm] = useState({ name: "", topic: "" });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Course</ModalHeader>

        <ModalBody>
          <Input placeholder="Course Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input mt={3} placeholder="Topic"
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
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
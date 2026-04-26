import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export default function PlacementModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    company: "",
    package: "",
  });

  const handleSubmit = () => {
    onSubmit(form);
    setForm({ company: "", package: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Placement Details</ModalHeader>

        <ModalBody>
          <VStack spacing={3}>
            <Input
              placeholder="Company Name"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <Input
              placeholder="Package (LPA)"
              value={form.package}
              onChange={(e) =>
                setForm({ ...form, package: e.target.value })
              }
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button colorScheme="green" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
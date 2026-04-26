import { VStack, Input } from "@chakra-ui/react";

type Props = {
  form: any;
  setForm: (data: any) => void;
};

export default function TeacherForm({ form, setForm }: Props) {
  return (
    <VStack spacing={3}>
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <Input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />

      <Input
        placeholder="Experience (years)"
        value={form.experience}
        onChange={(e) =>
          setForm({ ...form, experience: e.target.value })
        }
      />
    </VStack>
  );
}
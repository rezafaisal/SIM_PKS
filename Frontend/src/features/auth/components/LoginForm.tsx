import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLogin } from "../api";

const LoginForm: React.FC = () => {
  const form = useForm({
    initialValues: { username: "", password: "" },
  });
  const loginMutation = useLogin({
    config: {
      onError: ({ response }) => {
        form.setErrors({
          username: " ",
          password: (response?.data as any).messages.error,
        });
      },
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginMutation.mutateAsync({ data: form.values });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          label={<div className="font-semibold text-base pb-1">Username</div>}
          variant="filled"
          name="username"
          placeholder="Username"
          withAsterisk={false}
          styles={{
            input: { borderColor: "#EEEEEE", background: "#F9F9F9" },
          }}
          required
          {...form.getInputProps("username")}
        />
      </div>
      <div className="mb-12">
        <PasswordInput
          label={<div className="font-semibold text-base pb-1 ">Password</div>}
          variant="filled"
          name="password"
          placeholder="Password"
          withAsterisk={false}
          styles={{
            input: { borderColor: "#EEEEEE", background: "#F9F9F9" },
          }}
          required
          {...form.getInputProps("password")}
        />
      </div>
      <Button
        className="bg-orange-400 hover:bg-orange-500"
        type="submit"
        radius="md"
        fullWidth
        loading={loginMutation.isLoading}
      >
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;

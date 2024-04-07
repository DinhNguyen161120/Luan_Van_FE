import { isNotEmpty, useForm } from '@mantine/form';
import { Anchor, Checkbox, Flex, Group, Paper, PaperProps, PasswordInput, Stack, Text } from '@mantine/core';
import { TextInput, Button, Box, rem } from '@mantine/core';
import { loginApi, registerApi } from '../../api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { useLingui } from '@lingui/react';

export const Login = (props: PaperProps) => {
    const [showLoader, setShowLoader] = useState(false);
    let i18n = useLingui();
    const [type, toggle] = useToggle(["login", "register"]);
    i18n._("login");
    i18n._("register");
    const router = useRouter()
    const dispatch = useDispatch()
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const form = useForm({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            terms: true,
        },

        validate: {
            email: (val) => (emailRegex.test(val) ? null : i18n._("Email không đúng")),
            password: (val) =>
                val.length < 6 ? i18n._("Mật khẩu nên có ít nhất 8 ký tự") : null,
            confirmPassword: (value, values) =>
                value !== values.password && type === "register"
                    ? i18n._("Mật khẩu xác nhận không chính xác")
                    : null,
        },
    });

    const handleSubmitForm = async () => {
        if (type === "login") {
            setShowLoader(true);
            const response: any = await loginApi({
                email: form.values.email,
                password: form.values.password,
            });
            if (response.error) {
                setShowLoader(false);
                toast.error(response?.exception?.response?.data)
            } else {
                const data = response?.data?.metadata?.userDetails;
                // localStorage.setItem("userDetails", JSON.stringify(data)); Node
                localStorage.setItem("userDetails", data);
                router.push(`/regex2nfa`);
            }
        } else if (type === "register") {
            setShowLoader(true);
            const response: any = await registerApi({
                email: form.values.email,
                password: form.values.password,
                firstName: form.values.firstName,
                lastName: form.values.lastName,
            });
            if (response.error) {
                toast.error(response?.exception?.response?.data, {
                    position: "bottom-center",
                })
                setShowLoader(false);
            } else {
                toast.success("Registered successfully", {
                    position: "bottom-center",
                });
                toggle();
                const userData = response?.data?.metadata?.userDetails;
                // localStorage.setItem("userDetails", JSON.stringify(userData)); Node
                localStorage.setItem("userDetails", userData);
                setShowLoader(false);
                router.push(`/driver`);
            }
        }
    };
    return <Flex h={"90vh"}>
        {/* <Box
            visibleFrom="md"
            w={"50%"}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Box component="div" w={"100%"} h={"60%"} pos={"relative"}>
                <Image
                    src={"/figure1a.png"}
                    fill
                    sizes="(max-width: 100%)"
                    alt="bg image"
                    priority={true}
                />
            </Box>
        </Box> */}
        <Flex justify={"center"} align={"center"} mx={"auto"}>
            <Paper w={{ base: "400px", md: "450px" }} radius="md" p="xl" withBorder {...props}>
                <Flex justify={"space-between"}>
                    <Text size="lg" fw={500}>
                        {type === 'login' ? "Đăng nhập" : "Đăng kí"}
                    </Text>
                </Flex>

                <form
                    onSubmit={form.onSubmit(() => {
                        handleSubmitForm();
                    })}
                >
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                required
                                label={i18n._("Tên")}
                                placeholder={i18n._("Tên của bạn...")}
                                value={form.values.firstName}
                                onChange={(event) =>
                                    form.setFieldValue("firstName", event.currentTarget.value)
                                }
                                radius="md"
                            />
                        )}
                        {type === "register" && (
                            <TextInput
                                required
                                label={i18n._("Họ")}
                                placeholder={i18n._("Họ của bạn...")}
                                value={form.values.lastName}
                                onChange={(event) =>
                                    form.setFieldValue("lastName", event.currentTarget.value)
                                }
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="test@gmail.com"
                            value={form.values.email}
                            onChange={(event) =>
                                form.setFieldValue("email", event.currentTarget.value)
                            }
                            error={form.errors.email && "Email không đúng"}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label={i18n._("Mật khẩu")}
                            placeholder={i18n._("Mật khẩu của bạn ...")}
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue("password", event.currentTarget.value)
                            }
                            error={
                                form.errors.password &&
                                i18n._("Mật khẩu phải có ít nhất 6 kí tự")
                            }
                            radius="md"
                        />

                        {type === "register" && (
                            <PasswordInput
                                label={i18n._("Xác nhận mật khẩu")}
                                placeholder={i18n._("Xác nhận mật khẩu")}
                                {...form.getInputProps("confirmPassword")}
                            />
                        )}

                        {/* {type === "register" && (
                            <Checkbox
                                label={i18n._("Tôi đồng ý với điều khoản")}
                                checked={form.values.terms}
                                onChange={(event) =>
                                    form.setFieldValue("terms", event.currentTarget.checked)
                                }
                            />
                        )} */}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === "register"
                                ? i18n._("Bạn đã có tài khoản? Đăng nhập")
                                : i18n._("Bạn chưa có tài khoản? Đăng kí")}
                        </Anchor>
                        {showLoader ? (
                            <Button loading type="submit" radius="xl">
                                {upperFirst(type === 'login' ? "Đăng nhập" : "Đăng kí")}
                            </Button>
                        ) : (
                            <Button type="submit" radius="xl">
                                {upperFirst(type === 'login' ? "Đăng nhập" : "Đăng kí")}
                            </Button>
                        )}
                    </Group>
                </form>
            </Paper>
        </Flex>
    </Flex>
}

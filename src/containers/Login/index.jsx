import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { api } from "../../services/api";

import {
    Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer
} from "./style";
import Logo from "../../assets/logo.svg"
import { Button } from "../../components/Button";




export function Login() {

    const schema = yup
        .object({
            email: yup.string().email("Digite email@algumacoisa.com").required("Digite um email"),
            password: yup.string().min(6,"No minimo 6 caracteres").required("Digite uma senha"),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = async (data) => {
       const response = await api.post("/session", {
            email: data.email,
            password: data.password,
        });

        console.log(response);
    };


    return (
        <Container>
            <LeftContainer>

                <img src={Logo} alt="logo-devBurguer" />

            </LeftContainer>

            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span> Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email </label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha </label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <Button type="submit" > Entrar </Button>

                    <p>Não possui conta? <a>Clique aqui.</a></p>


                </Form>

            </RightContainer>
        </Container>
    );
}
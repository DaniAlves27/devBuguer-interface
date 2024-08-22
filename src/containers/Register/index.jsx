import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import * as yup from "yup"

import api  from "../../services/api";

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




export function Register() {

    const schema = yup
        .object({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email("Digite email@algumacoisa.com").required("Digite um email"),
            password: yup.string().min(6,"No minimo 6 caracteres").required("Digite uma senha"),
            confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais!").required("Confirme sua senha"),
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
       
       try {
        const {status} = await 
        api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password,

        },
        {
            validateStatus : () => true,        
        },
    );

    if (status === 200 || status === 201) {
        toast.success('Conta criada com sucesso!')
    }else if (status === 409){
        toast.error('Email já cadastrado! Faça login para continuar.');
        
    }else{
        throw new Error();
    }
        } catch (error) {
        toast.error('Falha no sistema! Tente Novamente')
    }
};   

    return (
        <Container>
            <LeftContainer>

                <img src={Logo} alt="logo-devBurguer" />

            </LeftContainer>

            <RightContainer>
                <Title>
                   Criar Conta
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                        <label>Name </label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

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

                    <InputContainer>
                        <label>Confirmar Senha </label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit" > Criar Conta </Button>

                    <p>Já possui conta? <a>Clique aqui.</a></p>


                </Form>

            </RightContainer>
        </Container>
    );
    
}
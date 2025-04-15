"use client";

import React from "react";
import { AuthFormLayoutProps } from "./types";
import {
  Form,
  Title,
  ErrorMessage,
  FormWrapper,
  StyledText,
  StyledButton,
  StyledLink,
  Card,
} from "./styles";
import { AuthDivider } from "./AuthDivider";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

export const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  onSubmit,
  error,
}) => {
  const onHandleGoogleSign = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/chat",
      });
      if (result?.error) {
        console.error("Error signing in with Google:", result.error);
      } else {
        console.log("Successfully signed in with Google:", result);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  return (
    <FormWrapper>
      <Form onSubmit={onSubmit}>
        <Title>{title}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {children}
        <StyledButton type="submit">
          {title === "Login" ? "Entrar" : "Crie sua conta"}
        </StyledButton>
        {title === "Login" && (
          <>
            <AuthDivider />
            <StyledButton
              startIcon={<GoogleIcon />}
              onClick={onHandleGoogleSign}
            >
              Continue com o Google
            </StyledButton>
          </>
        )}
      </Form>
      <Card>
        <StyledText>{footerText}</StyledText>
        <StyledLink href={footerLinkHref}>{footerLinkText}</StyledLink>
      </Card>
    </FormWrapper>
  );
};

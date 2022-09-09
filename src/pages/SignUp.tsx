import { FormEvent, useRef, useState} from 'react'
import { useAxios } from '../hooks/useAxios'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { PasswordInput } from '../components/PasswordInput'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { TextInput } from '../components/TextInput'
import { typeTextfieldRef } from '../constraints/types/TextFieldRef'
import { usernameConsistency } from '../constraints/verifiers/usernameConsistency'
import { emailConsistency } from '../constraints/verifiers/emailConsistency'

export function SignUp(){

  const usernameRef = useRef<typeTextfieldRef>(null)
  const emailRef = useRef<typeTextfieldRef>(null)
  const passwordRef = useRef<typeTextfieldRef>(null)

  const [isValidUsername, setIsValidUsername] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)

  function signupHandler(event: FormEvent<HTMLButtonElement>){
    event.preventDefault();
 
    if(isValidEmail && isValidPassword && isValidUsername){
      useAxios.post('/signup', {
          username:usernameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error.response.data)
        })
    } else {
      console.log("Login error.")
    }
  }

  return(
    <div>
      <Heading height="60px">Sign up</Heading>
      <form>
        <VStack id="form-stack" width="full" spacing={8}>    
          <TextInput
            type='text' 
            placeholder='Username'
            reference={usernameRef}
            verifyFunction={usernameConsistency}
            isValidState={isValidUsername}
            setIsValidState={setIsValidUsername}
            erroMessage="Invalid username."
          />      
          <TextInput
            type='email' 
            placeholder='Email'
            reference={emailRef}
            verifyFunction={emailConsistency}
            isValidState={isValidEmail}
            setIsValidState={setIsValidEmail}
            erroMessage="Invalid email."
          />
          <PasswordInput
            type='password' 
            placeholder='Password'
            reference={passwordRef}
            isValidState={isValidPassword}
            setIsValidState={setIsValidPassword}
            erroMessage="Invalid password."
          />
          <Button 
            colorScheme='red'
            width='full'
            rightIcon={<ArrowForwardIcon />}
            onClick={event=> signupHandler(event)}
            isDisabled={(isValidEmail && isValidPassword && isValidUsername) ? false : true}
          >
            Sign up
          </Button>
        </VStack>
      </form>
    </div>
  
  )
}

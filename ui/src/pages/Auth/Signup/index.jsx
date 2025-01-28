import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import AppTheme from '../shared-theme/AppTheme';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './../../../components/Auth/Signup/CustomIcons';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';

import {register} from "../../../redux/features/auth/actions.auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  heigth: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    // console.log("REG:", {auth})

    const [firstnameError, setFirstnameError] = React.useState(false);
    const [firstnameErrorMessage, setFirstnameErrorMessage] = React.useState('');
    const [lastnameError, setLastnameError] = React.useState(false);
    const [lastnameErrorMessage, setLastnameErrorMessage] = React.useState('');
    const [ageError, setAgeError] = React.useState(false);
    const [ageErrorMessage, setAgeErrorMessage] = React.useState('');
    const [genderError, setGenderError] = React.useState(false);
    const [genderErrorMessage, setGenderErrorMessage] = React.useState('');
    const [wordsError, setWordsError] = React.useState(false);
    const [wordsErrorMessage, setWordsErrorMessage] = React.useState('');
    const [digitsError, setDigitsError] = React.useState(false);
    const [digitsErrorMessage, setDigitsErrorMessage] = React.useState('');
    const [petnameError, setPetnameError] = React.useState(false);
    const [petnameErrorMessage, setPetnameErrorMessage] = React.useState('');

    const validateInputs = () => {
        const firstname = document.getElementById('firstname') as HTMLInputElement;
        const lastname = document.getElementById('lastname') as HTMLInputElement;
        const age = document.getElementById('age') as HTMLInputElement;
        const gender = document.getElementById('gender') as HTMLInputElement;
        const words = document.getElementById('words') as HTMLInputElement;
        const digits = document.getElementById('digits') as HTMLInputElement;
        const petname = document.getElementById('petname') as HTMLInputElement;

        let isValid = true;

        if (!firstname.value || firstname.value.length < 1) {
        setFirstnameError(true);
        setFirstnameErrorMessage('First name is required.');
        isValid = false;
        } else {
        setFirstnameError(false);
        setFirstnameErrorMessage('');
        }

        if (!lastname.value || lastname.value.length < 1) {
        setLastnameError(true);
        setLastnameErrorMessage('Last name is required.');
        isValid = false;
        } else {
        setLastnameError(false);
        setLastnameErrorMessage('');
        }

        if (!age.value ) { // || typeof age.value !== "number" || age.value <= 17
            setAgeError(true);
            setAgeErrorMessage('A valid Age is required.');
            isValid = false;
        } else {
            // console.log(age.value)
            // console.log("age type:", typeof age.value)
        setAgeError(false);
        setAgeErrorMessage('');
        }

        if (!gender.value || gender.value.length < 1) {
        setGenderError(true);
        setGenderErrorMessage('Gender is required.');
        isValid = false;
        } else {
        setGenderError(false);
        setGenderErrorMessage('');
        }

        if (!words.value || words.value.length < 1) {
        setWordsError(true);
        setWordsErrorMessage('Three different "Words" is required.');
        isValid = false;
        } else {
        setWordsError(false);
        setWordsErrorMessage('');
        }

        if (!digits.value) { //  || typeof digits !== "number" 
            setDigitsErrorMessage('Digits is required.');
            isValid = false;
        } else {
            // console.log("digits type:", typeof digits.value)
        setDigitsError(true);
        setDigitsError(false);
        setDigitsErrorMessage('');
        }

        if (!petname.value || petname.value.length < 1) {
        setPetnameError(true);
        setPetnameErrorMessage('Petname is required.');
        isValid = false;
        } else {
        setPetnameError(false);
        setPetnameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // if (firstnameError || lastnameError || ageError || genderError || wordsError || digitsError || petnameError) {
        event.preventDefault();
        //   return;
        // }

        const isValidInputs = validateInputs();

        if (isValidInputs) {
            const data = new FormData(event.currentTarget);

            const firstname = data.get('firstname');
            const lastname = data.get('lastname');
            const age = data.get('age');
            const gender = data.get('gender');
            const words = data.get('words');
            const digits = data.get('digits');
            const petname = data.get('petname');

            dispatch(register({
                firstname,
                lastname,
                age,
                gender,
                words,
                digits,
                petname
            }));
        }

    };

    
    React.useEffect(() => {
        if (auth) {
            if (auth.success && auth.status == "successful" && auth.message == "User registered successfully!"
            ) navigate("/session/signin")
        }
    })

  return (
    <>
      <CssBaseline enableColorScheme />
      {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <TextField
                autoComplete="firstname"
                name="firstname"
                required
                fullWidth
                id="firstname"
                placeholder="John"
                error={firstnameError}
                helperText={firstnameErrorMessage}
                color={firstnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <TextField
                autoComplete="lastname"
                name="lastname"
                required
                fullWidth
                id="lastname"
                placeholder="Wick"
                error={lastnameError}
                helperText={lastnameErrorMessage}
                color={lastnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="age">Age</FormLabel>
              <TextField
                autoComplete="age"
                name="age"
                type='number'
                required
                fullWidth
                id="age"
                placeholder="40"
                error={ageError}
                helperText={ageErrorMessage}
                color={ageError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <TextField
                autoComplete="gender"
                name="gender"
                required
                fullWidth
                id="gender"
                placeholder="Male"
                error={genderError}
                helperText={genderErrorMessage}
                color={genderError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="words">Three Words</FormLabel>
              <TextField
                autoComplete="words"
                name="words"
                required
                fullWidth
                id="words"
                placeholder="I am here"
                error={wordsError}
                helperText={wordsErrorMessage}
                color={wordsError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="digits">Digits</FormLabel>
              <TextField
                autoComplete="digits"
                name="digits"
                type='number'
                required
                fullWidth
                id="digits"
                placeholder="123"
                error={digitsError}
                helperText={digitsErrorMessage}
                color={digitsError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="petname">Petname</FormLabel>
              <TextField
                autoComplete="petname"
                name="petname"
                required
                fullWidth
                id="petname"
                placeholder="Snipper"
                error={petnameError}
                helperText={petnameErrorMessage}
                color={petnameError ? 'error' : 'primary'}
              />
            </FormControl>


            {/* <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl> */}
            
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
            //   startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
            //   startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/session/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
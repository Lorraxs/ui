import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Store } from '../../store/store';
import Locale from '../utils/lang';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as registerService from '../../service/registerService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const validateSchema = Yup.object().shape({
  email: Yup.string().required(Locale('EMAIL_REQUIRED')),
  password: Yup.string()
    .min(6, Locale('MIN_PASSWORD_LENGTH', '6'))
    .required(Locale('PASSWORD_REQUIRED')),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], Locale('REPASSWORD_INVALID'))
    .required(Locale('REPASSWORD_REQUIRED')),
  ref: Yup.string(),
});
console.log(validateSchema);
function Register() {
  const { dispatch } = useContext(Store);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validateSchema),
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const switchToLogin = () => {
    dispatch({ type: 'SHOW_PAGE', payload: 'Login' });
    dispatch({ type: 'HIDE_PAGE', payload: 'Register' });
  };
  const registerHandler = async e => {
    const result = await registerService.register(e);
    if (result) {
      if (result.success) {
      } else {
        toast.error(Locale(result.message), {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'colored',
        });
      }
    }
  };

  const invalidSubmit = e => {
    console.log(e);
  };
  return (
    <div className={cx('w-full h-full flex items-center justify-center', 'wrapper')}>
      <div className=" w-1/3 h-3/5 flex flex-col rounded-lg">
        <Typography variant="h1" mb={4}>
          {Locale('REGISTER')}
        </Typography>
        <form onSubmit={handleSubmit(registerHandler, invalidSubmit)} className="flex flex-col">
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <FormControl error={!!errors.email} className="mb-4">
                  <InputLabel htmlFor="email">{Locale('EMAIL')} </InputLabel>
                  <OutlinedInput
                    id="email"
                    {...field}
                    label={Locale('EMAIL')}
                    variant="outlined"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" edge="end">
                          <AccountCircle />
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                  <FormHelperText sx={{ marginBottom: '0', textAlign: 'right' }}>
                    {errors.email?.message ? errors.email?.message : ' '}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <FormControl error={!!errors.password}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    {Locale('PASSWORD')}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={Locale('INPUT_PASSWORD')}
                    variant="outlined"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                  <FormHelperText sx={{ marginBottom: '0', textAlign: 'right' }}>
                    {errors.password?.message ? errors.password?.message : ' '}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Controller
            control={control}
            name="repassword"
            render={({ field }) => {
              return (
                <FormControl error={!!errors.repassword}>
                  <InputLabel htmlFor="outlined-adornment-repassword">
                    {Locale('RETYPE_PASSWORD')}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-repassword"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={Locale('RETYPE_PASSWORD')}
                    variant="outlined"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle repassword visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                  <FormHelperText sx={{ marginBottom: '0', textAlign: 'right' }}>
                    {errors.repassword?.message ? errors.repassword?.message : ' '}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Controller
            control={control}
            name="ref"
            render={({ field }) => {
              return (
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-ref">{Locale('REF')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-ref"
                    className="mb-4"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={Locale('REF')}
                    variant="outlined"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle ref visibility" edge="end"></IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />
                </FormControl>
              );
            }}
          />
          <div>
            <LoadingButton size="lg" loadingPosition="end" variant="contained" type="submit">
              {Locale('REGISTER')}
            </LoadingButton>
            <Button variant="contained" color="warning" onClick={switchToLogin}>
              {Locale('LOGIN')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

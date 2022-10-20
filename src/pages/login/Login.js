import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
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

const cx = classNames.bind(styles);

const validateSchema = Yup.object().shape({
  email: Yup.string().required(Locale('EMAIL_OR_NAME_REQUIRED')),
  password: Yup.string()
    .min(6, Locale('MIN_PASSWORD_LENGTH', '6'))
    .required(Locale('PASSWORD_REQUIRED')),
});

function Login() {
  const { dispatch } = useContext(Store);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validateSchema),
  });
  console.log(errors, dirtyFields);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const switchToRegister = () => {
    dispatch({ type: 'SHOW_PAGE', payload: 'Register' });
    dispatch({ type: 'HIDE_PAGE', payload: 'Login' });
  };
  const registerHandler = async e => {
    console.log(e);
  };

  const invalidSubmit = e => {
    console.log(e);
  };
  return (
    <div className={cx('w-full h-full flex items-center justify-center', 'wrapper')}>
      <div className=" w-1/3 h-3/5 flex flex-col rounded-lg">
        <Typography variant="h1" mb={4}>
          {Locale('LOGIN')}
        </Typography>
        <form onSubmit={handleSubmit(registerHandler, invalidSubmit)} className="flex flex-col">
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <FormControl error={!!errors.email}>
                  <InputLabel htmlFor="outlined-adornment-username">
                    {Locale('EMAIL_OR_NAME')}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    {...field}
                    label="Nhập tên hoặc email"
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
                    label="Nhập mật khẩu"
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
          <div>
            <LoadingButton size="lg" loadingPosition="end" variant="contained" type="submit">
              {Locale('LOGIN')}
            </LoadingButton>
            <Button variant="contained" color="warning" onClick={switchToRegister}>
              {Locale('REGISTER')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormControl, FormGroup, TextField, Button } from '@material-ui/core';
import ModalWindow from '../../../components/common/ModalWindow/ModalWindow';

import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { selectStatusOfUser } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

interface IRegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export interface IRegisterFormProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterFormSchema = yup.object().shape({
  fullName: yup.string().required('Введите своё имя'),
  email: yup.string().email('Неверная почта').required('Введите почту'),
  username: yup.string().required('Введите логин'),
  password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
  password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
});

const RegisterModal: React.FC<IRegisterModalProps> = ({
  open,
  onClose,
}: IRegisterModalProps): React.ReactElement => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectStatusOfUser);

  const { control, handleSubmit, errors } = useForm<IRegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: IRegisterFormProps) => {
    dispatch(fetchSignUp(data));
    onClose();
  };

  return (
    <ModalWindow visible={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="form-control" component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Controller
              as={TextField}
              control={control}
              name="email"
              className="form__field"
              id="email"
              label="E-Mail"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="email"
              defaultValue=""
              helperText={errors.email?.message}
              error={!!errors.email}
              fullWidth
              autoFocus
            />
            <Controller
              as={TextField}
              control={control}
              name="username"
              className="form__field"
              id="username"
              label="Логин"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="text"
              defaultValue=""
              helperText={errors.username?.message}
              error={!!errors.username}
              fullWidth
            />
            <Controller
              as={TextField}
              control={control}
              name="fullName"
              className="form__field"
              id="fullName"
              label="Ваше имя"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="text"
              defaultValue=""
              helperText={errors.fullName?.message}
              error={!!errors.fullName}
              fullWidth
            />
            <Controller
              as={TextField}
              control={control}
              name="password"
              className="form__field"
              id="password"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              defaultValue=""
              helperText={errors.password?.message}
              error={!!errors.password}
              fullWidth
            />
            <Controller
              as={TextField}
              control={control}
              name="password2"
              className="form__field"
              id="password2"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              defaultValue=""
              helperText={errors.password2?.message}
              error={!!errors.password2}
              fullWidth
            />
            <div className="form__button-wrapper">
              <Button
                className="form__button"
                disabled={loadingStatus === LoadingStatus.LOADING}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Регистрация
              </Button>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </ModalWindow>
  );
};

export default RegisterModal;
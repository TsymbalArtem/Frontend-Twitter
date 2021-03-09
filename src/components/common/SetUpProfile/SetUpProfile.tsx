import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateDataOfUser } from '../../../store/ducks/user/actionCreators';
import { selectStatusOfUser } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

import './SetUpProfile.scss';
import { FormControl, FormGroup, TextField, Button } from '@material-ui/core';
import { IUser } from '../../../store/ducks/user/contracts/state';
import { TiCameraOutline } from 'react-icons/ti';
import { uploadImage } from '../../../utils/uploadImage';

interface ISetUpProfileProps {
  userData?: IUser;
}

export interface ISetUpProfileFormProps {
  background: any;
  avatar?: any;
  fullName?: string;
  biography?: string;
}

const RegisterFormSchema = yup.object().shape({
  fullName: yup.string().min(2, 'Must be not less then 2 characters').max(40, 'Must be not more then 40 characters'),
  biography: yup.string().max(280, 'Must be not more then 280 characters'),
});

const SetUpProfile: React.FC<ISetUpProfileProps> = ({
  userData
}: ISetUpProfileProps): React.ReactElement => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectStatusOfUser);

  const [avatarImage, setAvatarImage] = useState<string | undefined>(userData?.avatar);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(userData?.background);

  const { control, register, handleSubmit, errors } = useForm<ISetUpProfileFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: ISetUpProfileFormProps) => {
    if (data.avatar[0]) {
      data.avatar = await imageHandler(data.avatar[0], 'avatar');
    } else {
      delete (data.avatar);
    }

    if (data.background[0]) {
      data.background = await imageHandler(data.background[0], 'background');
    } else {
      delete (data.background);
    }

    dispatch(updateDataOfUser(data));
  };

  const imageHandler = async (image: File, type: string) => {
    const { url } = await uploadImage(image, type);

    return url;
  };

  const onChangeBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    const blobUrl = imageToUrl(event);
    setBackgroundImage(blobUrl);
  };

  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const blobUrl = imageToUrl(event);
    setAvatarImage(blobUrl);
  };

  const imageToUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      return URL.createObjectURL(new Blob([file]));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl className="form-control" component="fieldset" fullWidth>
        <div className="form-file">
          <label
            className="form-file__background"
            htmlFor="background"
            style={{ background: backgroundImage ? `url(${backgroundImage})` : 'rgb(203, 214, 220)' }}
          >
            <TiCameraOutline className="form-file__icon" />
          </label>
          <input
            type="file"
            accept="image/*"
            ref={register}
            name="background"
            id="background"
            onChange={onChangeBackground}
          />
          <label
            className="form-file__avatar"
            htmlFor="avatar"
            style={{ background: avatarImage ? `url(${avatarImage})` : 'rgb(170, 186, 194)' }}
          >
            <TiCameraOutline className="form-file__icon" />
          </label>
          <input
            type="file"
            accept="image/*"
            ref={register}
            name="avatar"
            id="avatar"
            onChange={onChangeAvatar}
          />
        </div>

        <FormGroup aria-label="position" row>
          <Controller
            as={TextField}
            control={control}
            name="fullName"
            className="form__field"
            id="fullName"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            type="text"
            defaultValue={userData?.fullName}
            helperText={errors.fullName?.message}
            error={!!errors.fullName}
            fullWidth
          />
          <Controller
            as={TextField}
            control={control}
            name="biography"
            className="form__field"
            id="biography"
            label="Bio"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            type="text"
            defaultValue={userData?.biography}
            helperText={errors.biography?.message}
            error={!!errors.biography}
            multiline
            rows={4}
            fullWidth
          />
          <div className="form__button-wrapper">
            <Button
              className="form__button"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Save
            </Button>
          </div>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default SetUpProfile;
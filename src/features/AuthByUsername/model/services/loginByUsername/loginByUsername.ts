import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface loginByUsenameProps {
    username: string | undefined;
    password: string | undefined;
}

export const loginByUsername = createAsyncThunk<
    User,
    loginByUsenameProps,
    ThunkConfig<string>
>('login/fetchByIdStatus', async (authData, ThunkApi) => {
    const { extra, dispatch, rejectWithValue } = ThunkApi;
    try {
        const response = await extra.api.post<User>('/login', authData);
        if (!response.data) {
            throw new Error();
        }
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue('error');
    }
});

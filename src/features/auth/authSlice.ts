// src/features/auth/authSlice.ts
import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import backend from "../../services/backend";

export type UserRole = "admin" | "customer" | string;

export interface AuthUser {
	id: number;
	email: string;
	role: UserRole;
}

export interface AuthState {
	authenticatedUser: AuthUser | null;
	accessToken: string | null;
	authenticationStatus: "idle" | "loading" | "succeeded" | "failed";
	errorMessage: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface LoginPayload {
	user: AuthUser;
	token: string;
}

const initialState: AuthState = {
	authenticatedUser: null,
	accessToken: null,
	authenticationStatus: "idle",
	errorMessage: null,
};

export const authenticateUser = createAsyncThunk<
	LoginPayload,
	LoginCredentials
>("auth/authenticateUser", async (credentials, { rejectWithValue }) => {
	try {
		const response = await backend.post<LoginPayload>(
			"/auth/login",
			credentials
		);
		return response.data;
	} catch (unknownError: unknown) {
		type ApiErrorResponse = { message?: string };
		let humanReadableMessage = "No s'ha pogut iniciar la sessió.";

		if (unknownError instanceof AxiosError) {
			const serverData = unknownError.response?.data as
				| ApiErrorResponse
				| undefined;
			humanReadableMessage =
				serverData?.message ?? unknownError.message ?? humanReadableMessage;
		}
		return rejectWithValue(humanReadableMessage);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		hydrateFromLocalStorage: (state) => {
			const savedToken = window.localStorage.getItem("auth_token");
			const savedUser = window.localStorage.getItem("auth_user");
			if (savedToken && savedUser) {
				state.accessToken = savedToken;
				state.authenticatedUser = JSON.parse(savedUser) as AuthUser;
			}
		},
		signOut: (state) => {
			state.authenticatedUser = null;
			state.accessToken = null;
			state.authenticationStatus = "idle";
			state.errorMessage = null;
			window.localStorage.removeItem("auth_token");
			window.localStorage.removeItem("auth_user");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.authenticationStatus = "loading";
				state.errorMessage = null;
			})
			.addCase(
				authenticateUser.fulfilled,
				(state, action: PayloadAction<LoginPayload>) => {
					state.authenticationStatus = "succeeded";
					state.authenticatedUser = action.payload.user;
					state.accessToken = action.payload.token;

					window.localStorage.setItem("auth_token", action.payload.token);
					window.localStorage.setItem(
						"auth_user",
						JSON.stringify(action.payload.user)
					);
				}
			)
			.addCase(authenticateUser.rejected, (state, action) => {
				state.authenticationStatus = "failed";
				state.errorMessage =
					(action.payload as string) ?? "Error d'autenticació.";
			});
	},
});

export const { hydrateFromLocalStorage, signOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors útils
export const selectAuthState = (root: { auth: AuthState }) => root.auth;
export const selectIsAuthenticated = (root: { auth: AuthState }) =>
	Boolean(root.auth.accessToken);

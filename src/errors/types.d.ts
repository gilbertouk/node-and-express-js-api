type ErrorCode = "ERR_NOT_FOUND" | "ERR_VALID_INPUT" | "ERR_AUTH";

type ValidationError = {
  error: {
    message: string;
    code: ErrorCode;
    errors: { message: string }[];
  };
};

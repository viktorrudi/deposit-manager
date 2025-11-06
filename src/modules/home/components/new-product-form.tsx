import { useMemo, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import type { ProductInput, ProductPackaging } from "../../../api/product/types";
import { useCompaniesQuery } from "../../../api/company/hooks";
import { useUsersQuery } from "../../../api/user/hooks";
import { useCreateProductMutation } from "../../../api/product/hooks";
import { getApiErrorMessage, isSuccessResponse } from "../../../api/common/utils";

type FormValues = {
  name: string;
  packaging: ProductPackaging | undefined;
  deposit: number | undefined;
  volume: number | undefined;
  companyId: string | undefined;
  registeredById: string | undefined;
};

const PACKAGING_OPTIONS: ReadonlyArray<{ value: ProductPackaging; label: string }> = [
  { value: "pet", label: "PET" },
  { value: "can", label: "Can" },
  { value: "glass", label: "Glass" },
  { value: "tetra", label: "Tetra Pak" },
  { value: "other", label: "Other" },
];

const DEFAULT_VALUES: FormValues = {
  name: "",
  packaging: undefined,
  deposit: undefined,
  volume: undefined,
  companyId: undefined,
  registeredById: undefined,
};

type NewProductFormProps = {
  onSuccess?: () => void;
};

export function NewProductForm({ onSuccess }: NewProductFormProps) {
  const [submissionError, setSubmissionError] = useState<string | undefined>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, touchedFields, isSubmitted, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const companiesQuery = useCompaniesQuery();
  const usersQuery = useUsersQuery();
  const createProductMutation = useCreateProductMutation();

  const companyOptions = useMemo(() => {
    const response = companiesQuery.data;
    if (!isSuccessResponse(response)) return [];

    return response.data.map((company) => ({
      value: String(company.id),
      label: company.name,
    }));
  }, [companiesQuery.data]);

  const userOptions = useMemo(() => {
    const response = usersQuery.data;
    if (!isSuccessResponse(response)) return [];

    return response.data.map((user) => ({
      value: String(user.id),
      label: `${user.firstName} ${user.lastName}`,
    }));
  }, [usersQuery.data]);

  const getFieldErrorMessage = (field: keyof FormValues) => {
    const fieldError = errors[field];
    if (!fieldError?.message) {
      return undefined;
    }

    return isSubmitted || touchedFields[field] ? fieldError.message : undefined;
  };

  const onSubmit = handleSubmit(async (formValues) => {
    setSubmissionError(undefined);

    const payload: ProductInput = {
      name: formValues.name,
      packaging: formValues.packaging as ProductPackaging,
      deposit: formValues.deposit as number,
      volume: formValues.volume as number,
      companyId: Number(formValues.companyId),
      registeredById: Number(formValues.registeredById),
    };

    try {
      const response = await createProductMutation.mutateAsync(payload);
      if (isSuccessResponse(response)) {
        reset();
        onSuccess?.();
      }
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message || "Failed to create product. Please try again.";
        const normalizedMessage = message.toLowerCase();

        if (normalizedMessage.includes("name")) {
          setError("name", { type: "server", message });
        } else {
          setSubmissionError(message);
        }
      } else {
        setSubmissionError("Failed to create product. Please try again.");
      }
    }
  });

  const mutationPending = createProductMutation.isPending;
  const isBusy = mutationPending || isSubmitting;
  const companiesErrorMessage = companiesQuery.error ? getApiErrorMessage(companiesQuery.error) : undefined;
  const usersErrorMessage = usersQuery.error ? getApiErrorMessage(usersQuery.error) : undefined;

  const companyPlaceholder = companiesQuery.isLoading
    ? "Loading companies..."
    : companiesErrorMessage
      ? "Unable to load companies"
      : "Select company";

  const userPlaceholder = usersQuery.isLoading
    ? "Loading users..."
    : usersErrorMessage
      ? "Unable to load users"
      : "Select user";

  const isCompanySelectDisabled = isBusy || companiesQuery.isLoading || Boolean(companiesErrorMessage);
  const isUserSelectDisabled = isBusy || usersQuery.isLoading || Boolean(usersErrorMessage);

  const nameErrorId = "product-name-error";
  const packagingErrorId = "product-packaging-error";
  const depositErrorId = "product-deposit-error";
  const volumeErrorId = "product-volume-error";
  const companyErrorId = "product-company-error";
  const registeredByErrorId = "product-registered-by-error";

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="product-name">Product name</Label>
        <Input
          id="product-name"
          {...register("name", {
            required: "Name is required.",
            setValueAs: (value: string) => value.trim(),
          })}
          placeholder="Enter the product name"
          aria-invalid={Boolean(getFieldErrorMessage("name"))}
          aria-describedby={getFieldErrorMessage("name") ? nameErrorId : undefined}
          disabled={isBusy}
          required
        />
        {getFieldErrorMessage("name") ? (
          <p className="text-destructive text-sm" id={nameErrorId} role="alert">
            {getFieldErrorMessage("name")}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Packaging</Label>
        <Controller
          control={control}
          name="packaging"
          rules={{ required: "Select a packaging type." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as ProductPackaging);
                field.onBlur();
              }}
              disabled={isBusy}
              required
            >
              <SelectTrigger
                className="w-full justify-between"
                aria-invalid={Boolean(getFieldErrorMessage("packaging"))}
                aria-describedby={getFieldErrorMessage("packaging") ? packagingErrorId : undefined}
              >
                <SelectValue placeholder="Select packaging type" />
              </SelectTrigger>
              <SelectContent>
                {PACKAGING_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {getFieldErrorMessage("packaging") ? (
          <p className="text-destructive text-sm" id={packagingErrorId} role="alert">
            {getFieldErrorMessage("packaging")}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product-deposit">Deposit (in cents)</Label>
          <Input
            id="product-deposit"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            {...register("deposit", {
              valueAsNumber: true,
              required: "Deposit is required.",
              min: {
                value: 1,
                message: "Deposit must be a positive number.",
              },
              validate: (value) => (value === undefined || Number.isInteger(value) ? true : "Deposit must be a whole number."),
            })}
            placeholder="e.g. 15"
            aria-invalid={Boolean(getFieldErrorMessage("deposit"))}
            aria-describedby={getFieldErrorMessage("deposit") ? depositErrorId : undefined}
            disabled={isBusy}
            required
            onWheel={(event) => event.currentTarget.blur()}
          />
          {getFieldErrorMessage("deposit") ? (
            <p className="text-destructive text-sm" id={depositErrorId} role="alert">
              {getFieldErrorMessage("deposit")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-volume">Volume (in milliliters)</Label>
          <Input
            id="product-volume"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            {...register("volume", {
              valueAsNumber: true,
              required: "Volume is required.",
              min: {
                value: 1,
                message: "Volume must be a positive number.",
              },
              validate: (value) => (value === undefined || Number.isInteger(value) ? true : "Volume must be a whole number."),
            })}
            placeholder="e.g. 500"
            aria-invalid={Boolean(getFieldErrorMessage("volume"))}
            aria-describedby={getFieldErrorMessage("volume") ? volumeErrorId : undefined}
            disabled={isBusy}
            required
            onWheel={(event) => event.currentTarget.blur()}
          />
          {getFieldErrorMessage("volume") ? (
            <p className="text-destructive text-sm" id={volumeErrorId} role="alert">
              {getFieldErrorMessage("volume")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Company</Label>
        <Controller
          control={control}
          name="companyId"
          rules={{ required: "Select a company." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                field.onBlur();
              }}
              disabled={isCompanySelectDisabled}
              required
            >
              <SelectTrigger
                className="w-full justify-between"
                aria-invalid={Boolean(getFieldErrorMessage("companyId"))}
                disabled={isCompanySelectDisabled}
                aria-describedby={getFieldErrorMessage("companyId") ? companyErrorId : undefined}
              >
                <SelectValue placeholder={companyPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {companyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {companiesErrorMessage ? (
          <p className="text-destructive text-sm">{companiesErrorMessage}</p>
        ) : null}
        {getFieldErrorMessage("companyId") ? (
          <p className="text-destructive text-sm" id={companyErrorId} role="alert">
            {getFieldErrorMessage("companyId")}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Registered by</Label>
        <Controller
          control={control}
          name="registeredById"
          rules={{ required: "Select the user registering the product." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                field.onBlur();
              }}
              disabled={isUserSelectDisabled}
              required
            >
              <SelectTrigger
                className="w-full justify-between"
                aria-invalid={Boolean(getFieldErrorMessage("registeredById"))}
                disabled={isUserSelectDisabled}
                aria-describedby={getFieldErrorMessage("registeredById") ? registeredByErrorId : undefined}
              >
                <SelectValue placeholder={userPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {userOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {usersErrorMessage ? <p className="text-destructive text-sm">{usersErrorMessage}</p> : null}
        {getFieldErrorMessage("registeredById") ? (
          <p className="text-destructive text-sm" id={registeredByErrorId} role="alert">
            {getFieldErrorMessage("registeredById")}
          </p>
        ) : null}
      </div>

      {submissionError ? (
        <p className="text-destructive text-sm" role="alert">{submissionError}</p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Creating..." : "Create product"}
        </Button>
      </div>
    </form>
  );
}

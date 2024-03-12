"use client"

import { ReactElement, useCallback, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
  useFieldArray,
  FieldArrayWithId,
} from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import CheckBox from "../../Atoms/CheckBox";
import Dropdown from "../../Atoms/Dropdown";
import Modal from "../../Atoms/Modal";
import FormSectionWrapper from "../FormSectionWrapper";
import DateField from "./DateField";

import Asterisk from "../../icons/Asterisk";

import {
  DateModal,
  FormFields,
  RelationShipEnum,
} from "../../../../../Types/types";

import { postData } from "../../../../../Util/API/postReferencesForm";
import { nameRegex } from "../../../../../Util/regex";
import { formatReferencesPostBody } from "../../../../../Util/formatReferencesPostBody";
import { checkEmploymentLength } from "../../../../../Util/checkEmploymentLength";
import { datesAreValid } from "../../../../../Util/datesAreValid";

const dropdownOptions = [
  {
    key: RelationShipEnum.parent,
    label: 'Parent'
  },
  {
    key: RelationShipEnum.sibling,
    label: 'Sibling'
  },
  {
    key: RelationShipEnum.employer,
    label: 'Employer'
  },
  {
    key: RelationShipEnum.other,
    label: 'Other'
  },
];

const ReferencesForm = (): ReactElement => {
  const {
    handleSubmit,
    register,
    formState,
    watch,
    reset,
    control,
  } = useForm<FormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      personalAddress: "",
      employer: [
        {
          name: '',
          start_date: undefined,
          end_date: undefined,
        }
      ],
      guarantorName: "",
      guarantorAddress: "",
      relationshipToGuarantor: undefined,
    },
    mode: 'onChange',
  });

  const {fields, append} = useFieldArray({
    name: 'employer',
    control,
    }
  );

  const [currentlyWorking, setCurrentlyWorking] = useState<boolean>(false);
  const [dateModal, setDateModal] = useState<DateModal | undefined>(undefined);

  const [emplpoyerIndex, setEmployerIndex] = useState<number>(0);

  const onCurrentlyWorking = useCallback(() => {
    setCurrentlyWorking((c: boolean) => !c);
  }, []);

  const onSubmit: SubmitHandler<FormFields> = useCallback((data: FormFields) => {
    const body = formatReferencesPostBody(data, currentlyWorking);

    postData(body).then((data: Response) => console.log({ data }));
  }, [currentlyWorking]);

  const onDateField = useCallback((modal: DateModal, ix: number) => {
    setDateModal(() => modal);
    setEmployerIndex(() => ix);
  }, []);

  const onResetForm = useCallback(() => {
    reset();
    setCurrentlyWorking(() => false);
  }, []);

  console.log(watch('employer'))
  console.log('ST',watch(`employer.${emplpoyerIndex}.start_date`)?.getTime())
  console.log('ND', watch(`employer.${emplpoyerIndex}.end_date`)?.getTime())

  return (
    <>
      {formState.isSubmitted ? (
        <div className="w-1/2 h-96 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold mb-5">
            Thank you!
          </span>
          <Button
            bgColour="bg-teal"
            type="button"
            id="resetFromButton"
            rounded="rounded-full"
            padding="px-5 py-2"
            onClick={onResetForm}
          >
            <span className="text-veryDarkBlue">
              Reset
            </span>
          </Button>
        </div>
      ) : (
        <div className="w-full px-5">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mb-5">
                  <FormSectionWrapper title="Personal">
                    <div className="h-full">
                      <div className="mb-3">
                        <Input
                          label="First name"
                          placeholder="Enter your name"
                          rounded="rounded-full"
                          inputName="firstName"
                          register={register("firstName", {
                            required: true,
                            validate: (value: string) => {
                              if (!nameRegex.test(value)) {
                                return "Sorry, numbers and special characters are not allowed"
                              }

                              return true;
                            }
                          })}
                          errorMessage={formState.errors.firstName?.message}
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          label="Last name"
                          placeholder="Enter your last name"
                          rounded="rounded-full"
                          inputName="lastName"
                          register={register("lastName", {
                            required: true,
                            validate: (value: string) => {
                              if (!nameRegex.test(value)) {
                                return "Sorry, numbers and special characters are not allowed"
                              }

                              return true;
                            }
                          })}
                          errorMessage={formState.errors.lastName?.message}
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          label="Address"
                          placeholder="Enter your home adress"
                          inputName="personalAddress"
                          rounded="rounded-full"
                          register={register("personalAddress", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                  </FormSectionWrapper>
                </div>
                <div className="mb-5">
                  {fields.map((f: FieldArrayWithId<FormFields, 'employer'>, index: number) => (
                    <div key={f.id} className="mb-3">
                      <FormSectionWrapper title="Employer">
                        <div>
                          <div className="mb-3">
                            <Input
                              label="Employer name"
                              placeholder="Enter your employer's name"
                              rounded="rounded-full"
                              inputName="employerName"
                              register={register(`employer.${index}.name`, {
                                required: true,
                                validate: (value: string) => {
                                  if (!nameRegex.test(value)) {
                                    return "Sorry, numbers and special characters are not allowed"
                                  }

                                  return true;
                                }
                              })}
                              errorMessage={formState.errors?.employer?.[index]?.name ? "error" : ''}
                            />
                          </div>
                          <div className="mb-3 flex flex-col md:flex-row items-center -mx-2">
                            <div className="px-2 w-full">
                              <DateField
                                title="Employment start date"
                                placeholder="Select start date"
                                onDateField={() => onDateField(DateModal.from, index)}
                                date={watch(`employer.${index}.start_date`)}
                                buttonId="dateFieldFrom"
                              />
                            </div>
                            <div className="px-2 w-full">
                              <DateField
                                title="Employment end date"
                                placeholder="Select end date"
                                onDateField={() => onDateField(DateModal.to, index)}
                                date={watch(`employer.${index}.end_date`)}
                                disabled={currentlyWorking}
                                buttonId="dateFieldTo"
                              />
                            </div>
                          </div>
                          {datesAreValid(watch(`employer.${index}.start_date`), watch(`employer.${index}.end_date`)) && (
                            <span className="text-sm text-cancelRed">
                              End date cannot be before start date
                            </span>
                          )}
                          <div
                            className="flex flex-row items-center md:justify-end mb-3 cursor-pointer"
                            onClick={onCurrentlyWorking}
                          >
                            <CheckBox
                              boxId="rememberMe"
                              size="h-5 w-5"
                              checked={currentlyWorking}
                            />
                            <div className="ml-3">
                              <span className="text-sm text-veryDarkBlue">
                                I am currently working
                              </span>
                            </div>
                          </div>
                        </div>
                      </FormSectionWrapper>
                    </div>
                  ))}
                  {checkEmploymentLength(watch(`employer.${fields.length -1 }.start_date`), watch(`employer.${fields.length - 1}.end_date`)) && (
                    <div className="w-full flex flex-row items-center justify-end">
                      <Button
                        rounded="rounded-full"
                        bgColour="bg-veryDarkBlue"
                        id="adEmployerButton"
                        padding="px-5 py-2"
                        type="button"
                        onClick={() => append({
                          name: '',
                          start_date: new Date(),
                          end_date: undefined,
                        })}
                      >
                        <span className="text-white">
                          Add Employer
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="mb-5">
                  <FormSectionWrapper title="Guarantor">
                    <div>
                      <div className="mb-3">
                        <Input
                          label="Guarantor name"
                          placeholder="Enter your guarantor's name"
                          rounded="rounded-full"
                          inputName="guarantorName"
                          register={register("guarantorName", {
                            required: true,
                            validate: (value: string) => {
                              if (!nameRegex.test(value)) {
                                return "Sorry, numbers and special characters are not allowed"
                              }

                              return true;
                            }
                          })}
                          errorMessage={formState.errors.guarantorName?.message}
                        />
                      </div>
                      <div className="mb-3">
                        <Input
                          label="Guarantor address"
                          placeholder="Enter your guarantor's adress"
                          inputName="guarantorAddress"
                          rounded="rounded-full"
                          register={register("guarantorAddress", {
                            required: true,
                          })}
                        />
                      </div>
                      <div>
                        <Dropdown
                          label="Relationship to guarantor"
                          dropdownName="relationship"
                          options={dropdownOptions}
                          register={register("relationshipToGuarantor", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                  </FormSectionWrapper>
                </div>
                <div className="flex flex-row items-center">
                  <div className="text-cancelRed mr-2">
                    <Asterisk size="8" />
                  </div>
                  <span className="text-sm text-cancelRed">
                    All fields are required
                  </span>
                </div>
                <div className="flex flex-row items-center justify-end -mx-2">
                  <div className="px-2">
                    <Button
                      type="button"
                      id="resetFormButton"
                      rounded="rounded-full"
                      bgColour="bg-white"
                      border="border border-2 border-veryDarkBlue"
                      onClick={onResetForm}
                      padding="px-5 py-2"
                    >
                      <span className="text-veryDarkBlue font-semibold">
                        Reset
                      </span>
                    </Button>
                  </div>
                  <div className="px-2">
                    <Button
                      type="submit"
                      id="sendFormButton"
                      rounded="rounded-full"
                      bgColour="bg-teal"
                      padding="px-5 py-2"
                      disabled={!formState.isValid}
                    >
                      <span className="text-veryDarkBlue font-semibold">
                        Send
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {!!dateModal && (
            <Modal
              title={`Select ${dateModal === DateModal.from ? 'start' : 'end'} date`}
              onClose={() => setDateModal(undefined)}
            >
              <div>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name={dateModal === DateModal.from ? `employer.${emplpoyerIndex}.start_date` : `employer.${emplpoyerIndex}.end_date`}
                  render={({ field }: { field: ControllerRenderProps<FormFields, 'employer'> }) => (
                    <DatePicker
                      onChange={(date: Date) => {
                        setDateModal(() => undefined);
                        field.onChange(date);
                      }}
                      selected={Object.prototype.toString.call(field.value) === '[object Date]' ? new Date(Number(field.value)) : new Date()}
                      className="border border-2 border-mediumGray px-3 py-2 rounded "
                      dateFormat="dd/MM/YYYY"
                      id="datePicker"
                      data-testid="datePicker"
                      name="datePicker"
                    />
                  )}
                />
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default ReferencesForm;

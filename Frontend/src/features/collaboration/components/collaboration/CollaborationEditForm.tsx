import { Button, Checkbox, Select, TextInput, Textarea } from "@mantine/core";

import { DateInput } from "@mantine/dates";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreateCollaborationDTO,
  useUpdateCollaboration,
} from "features/collaboration/api";
import { useFacultyAlls } from "features/faculty/api/getFacultyAll";
import { useForm } from "@mantine/form";

interface Props {
  dataCollab: any;
  dataFaculty: any;
}

const CollaborationEditForm: React.FC<Props> = ({
  dataCollab,
  dataFaculty,
}) => {
  const [facultyValue, setFacultyValue] = useState<any>(
    dataCollab.faculty ? dataCollab.faculty : "-1"
  );
  const [contactData, setContactData] = useState([]);
  const [deanData, setDeanData] = useState([]);
  const [prodiData, setProdiData] = useState([]);
  const [checked, setChecked] = useState<any>(dataCollab.prodi);

  const form = useForm<CreateCollaborationDTO["data"]>({
    initialValues: {
      title: dataCollab.title,
      createdDate: dataCollab.createdDate
        ? new Date(dataCollab.createdDate)
        : null,
      expiredDate: dataCollab.expiredDate
        ? new Date(dataCollab.expiredDate)
        : null,
      region: dataCollab.region,
      facultyName: dataCollab.faculty,
      scope: dataCollab.scope,
      deanName: dataCollab.dean,
      contactName: dataCollab.contact,
      prodi: dataCollab.prodi,
      partner_name: dataCollab.partner.partner_name,
      letterNo1: dataCollab.letterNo[0],
      letterNo2: dataCollab.letterNo[1],
      signatory_name: dataCollab.partner.signatory_name,
      signatory_position: dataCollab.partner.signatory_position,
      contact_name: dataCollab.partner.contact_name,
      contact_position: dataCollab.partner.contact_position,
      contact_handphone_no: dataCollab.partner.contact_handphone_no,
      contact_address: dataCollab.partner.contact_address,
      contact_email: dataCollab.partner.contact_email,
    },
  });

  const { data } = useFacultyAlls({ facultyValue } as any);

  useEffect(() => {
    if (data) {
      setContactData(data.contact.contactData);
      setDeanData(data.dean.deanData);
      setProdiData(data.prodi);
      form.setValues({ facultyName: facultyValue });
      if (dataCollab.faculty == facultyValue) {
        setChecked(dataCollab.prodi);
        form.setValues({ contactName: dataCollab.contact });
        form.setValues({ deanName: dataCollab.dean });
      } else {
        setChecked([]);
        form.setValues({ contactName: data.contact.contactActiveId ?? null });
        form.setValues({ deanName: data.dean.deanActiveId ?? null });
      }
    }
  }, [facultyValue, data]);

  const { mutateAsync, isLoading } = useUpdateCollaboration({
    config: {
      onError({ response }) {
        form.setErrors((response?.data as any).messages);
      },
      onSuccess() {
        navigate("/kerjasama");
      },
    },
  });
  const navigate = useNavigate();

  const handleSubmit = form.onSubmit(async (data) => {
    await mutateAsync({
      data: {
        ...data,
        prodi: checked,
      },
      id: dataCollab.id,
    });
  });

  const faculty = useMemo(() => {
    return (dataFaculty ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataFaculty]);

  const dean = useMemo(() => {
    return (deanData ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [deanData]);

  const contact = useMemo(() => {
    return (contactData ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [contactData]);

  const prodi = useMemo(() => {
    return (prodiData ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [contactData]);

  return (
    <form className="relative " onSubmit={handleSubmit}>
      <section>
        <div className="flex items-center justify-between items-top pt-2 pb-3 ">
          <div className=" text-orange-400 text-[15px] font-semibold border-b-2 pb-2 pr-2 border-[#B6B6B6]">
            INFORMASI PERJANJIAN KERJASAMA
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-3 gap-y-5 md:gap-y-3  gap-x-28">
          <div className=" row-span-4 space-y-3">
            <Textarea
              label={
                <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                  Judul Kerjasama
                </div>
              }
              variant="filled"
              name="title"
              placeholder="Masukkan judul Kerjasama"
              withAsterisk={false}
              styles={{
                input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
              }}
              required
              minRows={8}
              {...form.getInputProps("title")}
            />
            <Select
              label={
                <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                  Skala Lingkup
                </div>
              }
              data={["Nasional", "Internasional"]}
              variant="filled"
              name="region"
              placeholder="Masukkan Skala Lingkup"
              withAsterisk={false}
              styles={{
                input: {
                  borderColor: "#B0ACAC",
                  background: "#F9F9F9",
                },
              }}
              {...form.getInputProps("region")}
            />
          </div>

          <DateInput
            label={
              <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                Tanggal Permohonan Dibuat
              </div>
            }
            variant="filled"
            name="createdDate"
            placeholder="Masukkan tanggal Permohonan Dibuat"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
            }}
            {...form.getInputProps("createdDate")}
          />
          <DateInput
            label={
              <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                Tanggal Permohonan Berakhir
              </div>
            }
            variant="filled"
            name="expiredDate"
            placeholder="Masukkan tanggal Permohonan berakhir"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
            }}
            {...form.getInputProps("expiredDate")}
          />
          <TextInput
            label={
              <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                No Surat Pertama
              </div>
            }
            variant="filled"
            name="letterNo1"
            placeholder="Masukkan No Surat Pertama"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
            }}
            {...form.getInputProps("letterNo1")}
          />
          <TextInput
            label={
              <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                No Surat Kedua
              </div>
            }
            variant="filled"
            name="letterNo2"
            placeholder="Masukkan No Surat Kedua"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
            }}
            {...form.getInputProps("letterNo2")}
          />
        </div>
        <div className="w-full mt-3 gap-y-5 md:gap-y-0  gap-x-28">
          <Textarea
            label={
              <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                Ruang Lingkup
              </div>
            }
            variant="filled"
            name="scope"
            placeholder="Masukkan Ruang Lingkup"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#B0ACAC", background: "#F9F9F9" },
            }}
            minRows={4}
            {...form.getInputProps("scope")}
          />
        </div>
      </section>
      <section className="mt-5 grid">
        <div className=" text-orange-400 text-[15px] font-semibold border-b-2 border-[#B6B6B6] w-fit pr-2 pb-1 ">
          PIHAK-PIHAK KERJASAMA
        </div>
        <div className="grid grid-cols-1 gap-y-5 md:gap-y-0  md:grid-cols-2 gap-x-28">
          <div className="mt-4">
            <div className="text-slate-600 border-b-2 pb-2 border-orange-400 flex items-center tracking-wide font-semibold text-[14.5px]">
              FAKULTAS
            </div>

            <div className="space-y-2 mt-5">
              <Select
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Fakultas
                  </div>
                }
                data={faculty}
                variant="filled"
                name="faculty"
                placeholder="Masukkan fakultas"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                value={facultyValue}
                onChange={setFacultyValue}
              />
              {facultyValue != -1 ? (
                <>
                  <Select
                    label={
                      <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                        Nama Penghubung
                      </div>
                    }
                    data={contact}
                    variant="filled"
                    name="contact"
                    placeholder="Masukkan Nama Penghubung"
                    withAsterisk={false}
                    styles={{
                      input: {
                        borderColor: "#B0ACAC",
                        background: "#F9F9F9",
                      },
                    }}
                    {...form.getInputProps("contactName")}
                  />
                  <Select
                    label={
                      <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                        Nama Dekan
                      </div>
                    }
                    data={dean}
                    variant="filled"
                    name="dean"
                    placeholder="Masukkan Nama Dekan"
                    withAsterisk={false}
                    styles={{
                      input: {
                        borderColor: "#B0ACAC",
                        background: "#F9F9F9",
                      },
                    }}
                    {...form.getInputProps("deanName")}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            {facultyValue != -1 ? (
              <div className="space-y-3 mt-5">
                <div className="font-semibold text-[13px]  text-[#00000099]">
                  Prodi
                </div>
                {prodi.map(({ label, value }) => (
                  <Checkbox
                    mt={10}
                    key={value}
                    color="orange.5"
                    size="md"
                    label={label}
                    value={value}
                    checked={
                      checked.find((item: any) => item == value) ? true : false
                    }
                    onChange={(event) =>
                      event.currentTarget.checked
                        ? setChecked([...checked, value])
                        : setChecked(
                            checked.filter((position: any) => position != value)
                          )
                    }
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="mt-4">
            <div className="text-slate-600 border-b-2 pb-2 border-orange-400 flex items-center tracking-wide font-semibold text-[14.5px]">
              MITRA
            </div>
            <div className="space-y-2 mt-5">
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Mitra
                  </div>
                }
                variant="filled"
                name="partnerName"
                placeholder="Masukkan Mitra"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("partner_name")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Nama Penandatangan
                  </div>
                }
                variant="filled"
                name="signatoryName"
                placeholder="Masukkan Nama Penandatangan"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("signatory_name")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Jabatan Penandatangan
                  </div>
                }
                variant="filled"
                name="signatoryPosition"
                placeholder="Masukkan Jabatan Penandatangan"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("signatory_position")}
              />
            </div>
            <div className=" mt-4 space-y-3 ">
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Nama Penghubung
                  </div>
                }
                variant="filled"
                name="contactName"
                placeholder="Masukkan Nama Penghubung"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("contact_name")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Jabatan Penghubung
                  </div>
                }
                variant="filled"
                name="contactPosition"
                placeholder="Masukkan Jabatan Penghubung"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("contact_position")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Kontak Penghubung
                  </div>
                }
                variant="filled"
                name="contactHandphoneNo"
                placeholder="Masukkan Kontak Penghubung"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("contact_handphone_no")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Alamat Penghubung
                  </div>
                }
                variant="filled"
                name="contactAddress"
                placeholder="Masukkan Alamat Penghubung"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("contact_address")}
              />
              <TextInput
                label={
                  <div className="font-semibold text-[13px] pb-1 text-[#00000099]">
                    Email Penghubung
                  </div>
                }
                variant="filled"
                name="contactEmail"
                placeholder="Masukkan Email Penghubung"
                withAsterisk={false}
                styles={{
                  input: {
                    borderColor: "#B0ACAC",
                    background: "#F9F9F9",
                  },
                }}
                {...form.getInputProps("contact_email")}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-end gap-4 mt-20">
        <Button
          to={"/kerjasama"}
          component={Link}
          className="bg-stone-400 hover:bg-stone-500 px-10"
        >
          Batal
        </Button>
        <Button
          loading={isLoading}
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-10"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default CollaborationEditForm;

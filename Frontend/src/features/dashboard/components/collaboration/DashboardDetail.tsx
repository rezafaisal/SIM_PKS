import { Button } from "@mantine/core";
import { Tabs } from "@mantine/core";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import Table2 from "components/elements/Table/Table2";
import { IconCopy, IconPrinter } from "@tabler/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CollaborationMakerPDF } from "features/collaboration/components/collaboration/CollaborationMakerPDF";

const columnsDocumentation = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama" },
  { id: "title", label: "Judul" },
  { id: "type", label: "Jenis" },
  {
    id: "mitra",
    label: `Nama Mitra`,
  },
  {
    id: "file_image",
    label: `Bukti Implementasi`,
  },
];

const columnsImplementation = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama Implementasi" },
  { id: "attachmentType", label: "Jenis lampiran" },
  { id: "prodi", label: "Prodi" },
  { id: "created_at", label: "Tanggal Pelaksanaan" },
  { id: "", label: "" },
];

const DashboardDetail = ({ collaboration, onSuccess }: any) => {
  const [activeTabs, setActiveTabs] = useState("fakultas");

  const [implementation, setImplementation] = useState<any>();
  const [documentation, setDocumentation] = useState<any>();

  console.log(collaboration);

  const handleCopy = (attachment: any) => {
    // Placeholder logic for copying
    navigator.clipboard
      .writeText(attachment)
      .then(() => {
        console.log("Text copied to clipboard:", attachment);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const handlePrint = (attachmentFile: any) => {
    // Placeholder logic for opening the file
    window.open(attachmentFile, "_blank");
  };

  useEffect(() => {
    if (collaboration.documentation) {
      setDocumentation(
        collaboration.documentation.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            mitra: collaboration.partner.partner_name,
          };
        })
      );
    }
    if (collaboration.implementation) {
      setImplementation(
        collaboration.implementation.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            attachmentType: item.attachment_file ? "File" : "Link",
          };
        })
      );
    }
  }, [collaboration]);

  return (
    <section className="relative px-3 pb-5">
      <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[10px] sm:text-[15px] font-medium">
        <span className="">
          Judul Kerjasama
          <div className="font-bold">
            {collaboration.title ? collaboration.title : "-"}
          </div>
        </span>
        <div className="grid sm:grid-cols-2 gap-y-4">
          <span>
            No Surat Pertama
            <div className="font-bold">
              {collaboration.letterNo[0] ? collaboration.letterNo[0] : "-"}
            </div>
          </span>
          <span>
            No Surat Kedua
            <div className="font-bold">
              {collaboration.letterNo[1] ? collaboration.letterNo[1] : "-"}
            </div>
          </span>
          <span>
            Tanggal Berakhir
            <div className="font-bold">
              {collaboration.expiredDate
                ? dayjs(collaboration.expiredDate).format("D MMMM YYYY")
                : "-"}
            </div>
          </span>
          <span>
            Durasi Kerjasama Tersisa
            <div className="font-bold text-white pt-1">
              {collaboration.expiredDate ? (
                collaboration.deadline >= 0 ? (
                  <span
                    className={`capitalize py-1 px-3 rounded-3xl font-semibold bg-green-500`}
                  >
                    Selesai
                  </span>
                ) : (
                  <span
                    className={`capitalize py-1 px-3 rounded-3xl font-semibold ${
                      collaboration.deadline > -30
                        ? " bg-yellow-500"
                        : "bg-sky-400"
                    }`}
                  >
                    {Math.abs(collaboration.deadline)} Hari
                  </span>
                )
              ) : (
                <span
                  className={`capitalize py-1 px-3 rounded-3xl font-semibold bg-gray-500`}
                >
                  Belum Ditentukan
                </span>
              )}
            </div>
          </span>
        </div>
        <span className="">
          Ruang Lingkup
          <div className="font-bold">
            {collaboration.scope ? collaboration.scope : "-"}
          </div>
        </span>
      </div>

      <Tabs color="orange.4" defaultValue="fakultas" className="pt-7">
        <Tabs.List>
          <Tabs.Tab
            value="fakultas"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs  md:text-base ${
              activeTabs == "fakultas" ? "!text-orange-400" : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("fakultas")}
          >
            FAKULTAS
          </Tabs.Tab>
          <Tabs.Tab
            value="mitra"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs md:text-base ${
              activeTabs == "mitra" ? "!text-orange-400" : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("mitra")}
          >
            MITRA
          </Tabs.Tab>
          <Tabs.Tab
            value="implementation"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs md:text-base ${
              activeTabs == "implementation"
                ? "!text-orange-400"
                : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("implementation")}
          >
            IMPLEMENTASI
          </Tabs.Tab>
          <Tabs.Tab
            value="documentation"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs md:text-base ${
              activeTabs == "documentation"
                ? "!text-orange-400"
                : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("documentation")}
          >
            DOKUMENTASI
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt="md" value="fakultas">
          <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[10px] sm:text-[15px] font-medium">
            <span>
              Fakultas
              <div className="font-bold">
                {collaboration.faculty ? collaboration.faculty : "-"}
              </div>
            </span>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              <span>
                Nama Dekan
                <div className="font-bold">
                  {collaboration.dean.name ? collaboration.dean.name : "-"}
                </div>
              </span>
              <span>
                NIP Dekan
                <div className="font-bold">
                  {collaboration.dean.nip ? collaboration.dean.nip : "-"}
                </div>
              </span>
              <span>
                Jabatan Dekan
                <div className="font-bold">
                  {collaboration.dean.position
                    ? collaboration.dean.position
                    : "-"}
                </div>
              </span>
            </div>
            <span className="pt-1">
              Prodi yang Bersangkutan
              <div className="font-bold">
                {collaboration.prodi[0] ? (
                  <ol className="pl-3 md:pl-5 m-0">
                    {collaboration.prodi.map((item: any) => (
                      <li>{item.name}</li>
                    ))}
                  </ol>
                ) : (
                  <span className="-pl-5">-</span>
                )}
              </div>
            </span>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 pt-1">
              <span>
                Nama Penghubung
                <div className="font-bold">
                  {collaboration.contact.name
                    ? collaboration.contact.name
                    : "-"}
                </div>
              </span>
              <span>
                Jabatan Penghubung
                <div className="font-bold">
                  {collaboration.contact.position
                    ? collaboration.contact.position
                    : "-"}
                </div>
              </span>
              <span>
                Kontak Penghubung
                <div className="font-bold">
                  {collaboration.contact.handphone_no
                    ? collaboration.contact.handphone_no
                    : "-"}
                </div>
              </span>
              <span>
                Alamat Penghubung
                <div className="font-bold">
                  {collaboration.contact.address
                    ? collaboration.contact.address
                    : "-"}
                </div>
              </span>
              <span>
                Email Penghubung
                <div className="font-bold">
                  {collaboration.contact.email
                    ? collaboration.contact.email
                    : "-"}
                </div>
              </span>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel pt="xs" value="mitra">
          <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[10px] sm:text-[15px] font-medium">
            <span>
              Mitra
              <div className="font-bold">
                {collaboration.partner.partner_name
                  ? collaboration.partner.partner_name
                  : "-"}
              </div>
            </span>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              <span>
                Nama Penandatangan
                <div className="font-bold">
                  {collaboration.partner.signatory_name
                    ? collaboration.partner.signatory_name
                    : "-"}
                </div>
              </span>
              <span>
                NIP Penandatangan
                <div className="font-bold">
                  {collaboration.partner.signatory_nip
                    ? collaboration.partner.signatory_nip
                    : "-"}
                </div>
              </span>
              <span>
                Jabatan Penandatangan
                <div className="font-bold">
                  {collaboration.partner.signatory_position
                    ? collaboration.partner.signatory_position
                    : "-"}
                </div>
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 pt-1">
              <span>
                Nama Penghubung
                <div className="font-bold">
                  {collaboration.partner.contact_name
                    ? collaboration.partner.contact_name
                    : "-"}
                </div>
              </span>
              <span>
                Jabatan Penghubung
                <div className="font-bold">
                  {collaboration.partner.contact_position
                    ? collaboration.partner.contact_position
                    : "-"}
                </div>
              </span>
              <span>
                Kontak Penghubung
                <div className="font-bold">
                  {collaboration.partner.contact_handphone_no
                    ? collaboration.partner.contact_handphone_no
                    : "-"}
                </div>
              </span>
              <span>
                Alamat Penghubung
                <div className="font-bold">
                  {collaboration.partner.contact_address
                    ? collaboration.partner.contact_address
                    : "-"}
                </div>
              </span>
              <span>
                Email Penghubung
                <div className="font-bold">
                  {collaboration.partner.contact_email
                    ? collaboration.partner.contact_email
                    : "-"}
                </div>
              </span>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel pt="xs" value="implementation">
          <Table2
            header={columnsImplementation}
            searchTerm=""
            items={implementation ? implementation : []}
            renderItem={(implementation) => (
              <tr key={implementation.id} className="">
                <td
                  key={columnsImplementation[0].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700"
                >
                  {
                    implementation[
                      columnsImplementation[0].id as keyof typeof implementation
                    ]
                  }
                </td>
                <td
                  key={columnsImplementation[1].id}
                  className="py-5 px-4 font-bold text-sm text-gray-700"
                >
                  {
                    implementation[
                      columnsImplementation[1].id as keyof typeof implementation
                    ]
                  }
                </td>

                <td
                  key={columnsImplementation[2].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 "
                >
                  {
                    implementation[
                      columnsImplementation[2].id as keyof typeof implementation
                    ]
                  }
                </td>
                <td
                  key={columnsImplementation[3].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 "
                >
                  {
                    implementation[
                      columnsImplementation[3].id as keyof typeof implementation
                    ].name
                  }
                </td>
                <td
                  key={columnsImplementation[4].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 "
                >
                  {dayjs(
                    implementation[
                      columnsImplementation[4].id as keyof typeof implementation
                    ]
                  ).format("D MMM YYYY")}
                </td>
                <td className="gap-x-3 py-5 w-40 ">
                  <div className="flex items-center justify-center gap-x-3 ">
                    {implementation[
                      columnsImplementation[2].id as keyof typeof implementation
                    ] == "File" ? (
                      <IconPrinter
                        onClick={() =>
                          handlePrint(implementation.attachment_file)
                        }
                        className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                      />
                    ) : (
                      <IconCopy
                        onClick={() => handleCopy(implementation.attachment)}
                        className="border-2 rounded-md text-purple-400 hover:bg-purple-50 cursor-pointer"
                      />
                    )}
                  </div>
                </td>
              </tr>
            )}
          />
        </Tabs.Panel>

        <Tabs.Panel pt="xs" value="documentation">
          <Table2
            header={columnsDocumentation}
            searchTerm=""
            // loading={isLoadingDocumentation}
            items={documentation ? documentation : []}
            renderItem={(documentation) => (
              <tr key={documentation.id} className="">
                <td
                  key={columnsDocumentation[0].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700"
                >
                  {
                    documentation[
                      columnsDocumentation[0].id as keyof typeof documentation
                    ]
                  }
                </td>
                <td
                  key={columnsDocumentation[1].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700"
                >
                  {
                    documentation[
                      columnsDocumentation[1].id as keyof typeof documentation
                    ]
                  }
                </td>

                <td
                  key={columnsDocumentation[2].id}
                  className="py-5 px-4 font-bold capitalize text-sm text-gray-700 min-w-[20rem] !whitespace-normal"
                >
                  {
                    documentation[
                      columnsDocumentation[2].id as keyof typeof documentation
                    ]
                  }
                </td>
                <td
                  key={columnsDocumentation[3].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 "
                >
                  {
                    documentation[
                      columnsDocumentation[3].id as keyof typeof documentation
                    ].name
                  }
                </td>
                <td
                  key={columnsDocumentation[4].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 "
                >
                  {
                    documentation[
                      columnsDocumentation[4].id as keyof typeof documentation
                    ]
                  }
                </td>
                <td
                  key={columnsDocumentation[5].id}
                  className="py-5 px-4 font-medium text-sm text-gray-700 z-50"
                >
                  <a
                    href={
                      documentation[
                        columnsDocumentation[5].id as keyof typeof documentation
                      ]
                    }
                    download
                    target="_blank"
                  >
                    <img
                      className="rounded-lg h-28 w-36 bg-gray-100"
                      src={
                        documentation[
                          columnsDocumentation[5]
                            .id as keyof typeof documentation
                        ]
                      }
                      alt=""
                    />
                  </a>
                </td>
              </tr>
            )}
          />
        </Tabs.Panel>
      </Tabs>

      <div className="flex items-center justify-center md:justify-end gap-4 mt-6">
        <PDFDownloadLink
          document={<CollaborationMakerPDF collaboration={collaboration} />}
          fileName="FORM"
        >
          {({ loading }) => (
            <Button
              type="button"
              leftIcon={<IconPrinter size={18} />}
              loading={loading}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Cetak
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </section>
  );
};

export default DashboardDetail;

import { Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 65,
    paddingHorizontal: 70,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: "extrabold",
    textAlign: "center",
    color: "black",
    fontFamily: "Helvetica-Bold",
  },
  headerSecond: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: "extrabold",
    textAlign: "left",
    color: "black",
    fontFamily: "Helvetica-Bold",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
  },
  // TABLE
  table: {
    width: "100%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    gap: "0px -1px",
    marginTop: "-1px",
  },
  col1: {
    padding: "3px 0px 3px 4px",
    width: "4%",
    fontSize: 13,
    border: "1px solid #000000",
  },
  col2: {
    padding: "3px 7px 3px 5px",
    width: "35%",
    fontSize: 13,
    border: "1px solid #000000",
  },
  col3: {
    padding: "3px 7px 3px 5px",
    fontSize: 13,
    border: "1px solid #000000",
  },
  col4: {
    padding: "3px 5px ",
    fontSize: 12.5,
    width: "100%",
    border: "1px solid #000000",
  },

  col: {
    flex: 1,
    fontSize: 13,
  },
});

export const CollaborationMakerPDF = ({ collaboration }: any) => {
  const data = [
    {
      title: "JUDUL KERJA SAMA",
      value: collaboration?.title,
    },
    {
      title: "REFERENSI KERJA SAMA (MoA/IA)",
      value:
        "a. PKS nomor : " + collaboration?.letterNo[0] + "\nb. IA/SPK nomor :",
    },
    {
      title: "MITRA KERJASAMA",
      value: collaboration?.partner?.partner_name,
    },
    {
      title: "RUANG LINGKUP",
      value: collaboration?.scope,
    },
    {
      title: "HASIL PELAKSANAAN (OUTPUT & OUTCOME)",
      value: collaboration?.implementation
        .map((item: any) => {
          if (item.attachment != "File") {
            return `${item.attachment}`;
          } else {
            return `${item.attachment_file}`;
          }
        })
        .join("\n"),
    },

    {
      title:
        "TAUTAN/LINK DOKUMENTASI KEGIATAN (foto/berita dalam google drive)",
      value: collaboration?.documentation
        .map((item: any) => {
          return `${item.title} - ${item.type.name}`;
        })
        .join("\n"), // Join the results into a single string
    },
  ];
  return (
    <div className=" h-screen">
      {/* <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document> */}
      <Page size="A4" style={styles.body} orientation="landscape">
        <Text style={styles.header}>LAPORAN PELAKSANAAN KERJA SAMA</Text>
        <Text style={styles.headerSecond}>
          TAHUN {dayjs(new Date()).format("YYYY")}
        </Text>
        {/* <Image style={styles.image} src={LebronStretch}/> */}
        {data.map((item, index) => (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.col1}>{index + 1}.</Text>
              <Text style={styles.col2}>{item.title}</Text>
              <Text style={styles.col3}>:</Text>
              <Text style={styles.col4}>{item.value}</Text>
            </View>
          </View>
        ))}

        <View wrap={false}>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
          >
            <Text style={styles.col}>PENANGGUNG JAWAB KEGIATAN</Text>
            <Text style={styles.col}></Text>
            <Text style={styles.col}>
              Mengetahui,{"\n"}( {collaboration?.dean?.position},),
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.col}>
              {dayjs(new Date()).format("dddd, DD MMMM YYYY")}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 8 }}>
            <Text style={styles.col}>{collaboration?.contact?.position},</Text>
            <Text style={styles.col}>
              {collaboration?.partner?.partner_name},
            </Text>
            <Text style={styles.col}></Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 50 }}
          >
            <Text
              style={styles.col}
            >{`${collaboration?.contact?.name}\n${collaboration?.contact?.nip}`}</Text>
            <Text style={styles.col}>
              {`${collaboration?.partner?.signatory_name}\n${
                collaboration?.partner?.signatory_nip
                  ? collaboration?.partner?.signatory_nip
                  : ""
              }`}
            </Text>
            <Text
              style={styles.col}
            >{`${collaboration?.dean?.name}\n${collaboration?.dean?.nip}`}</Text>
          </View>
        </View>
      </Page>
      {/* </Document>
      </PDFViewer> */}
    </div>
  );
};

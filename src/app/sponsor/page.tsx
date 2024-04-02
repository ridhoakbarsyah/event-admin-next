import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const SponsorPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Sponsor"} />

      <div className="flex justify-end">
        <Button variant="outlined" className="mb-4" href="/create">
          Tambah Sponsor
        </Button>
      </div>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="dark:text-white">No</TableCell>
              <TableCell className="dark:text-white">Nama Sponsor</TableCell>
              <TableCell className="dark:text-white">Logo</TableCell>
              <TableCell className="dark:text-white" align="right">
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </DefaultLayout>
  );
};

export default SponsorPage;

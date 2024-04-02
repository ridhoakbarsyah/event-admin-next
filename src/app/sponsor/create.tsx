import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CreatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Sponsor"} />

      <div>
        <h1>Create Sponsor</h1>
        <form>
          <div>
            <label htmlFor="name">Nama Sponsor</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="logo">Logo</label>
            <input type="file" id="logo" name="logo" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;

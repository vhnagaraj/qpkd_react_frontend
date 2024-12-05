import { Button, Grid2, TextField } from "@mui/material";
import AceEditor from "react-ace";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Import the desired modes and themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import axios from "axios";
import { useEffect, useState } from "react";

const Encryot = () => {
  const [resp, setResp] = useState("");
  const [decData, setDecData] = useState("");
  const navigate = useNavigate();
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      message1: "",
      qvantum: "",
      code1: "",
    },
  });

  useEffect(() => {
    const fetchQuantamId = async () => {
      const response = await axios.get(
        "http://172.19.100.136:5000/api/communication/initialize"
      );
      if (response.status === 200) {
        setValue("qvantum", response?.data?.quantum_key);
        console.log({ apidata: response?.data?.quantum_key });
      }
    };
    fetchQuantamId();
  }, [setValue]);

  console.log({ resp: JSON.stringify(resp) });

  const handleEncy = async (data) => {
    const response = await axios.post(
      "http://172.19.100.136:5000/api/communication/send_data",
      {
        data: data.message1,
        quantum_key: data.qvantum,
      }
    );

    setResp(response?.data);
  };

  const handleDeyc = async (data) => {
    const datas = JSON.parse(data.code2);
    console.log({ ddddddddd: datas });

    const resp = await axios.post(
      "http://172.19.100.136:5000/api/communication/receive_data",
      {
        datas,
      }
    );
    setDecData(resp?.data?.decrypted_data);
    console.log({ response: resp?.data?.decrypted_data });
  };

  const handleLogOut = async () => {
    await axios.get("http://172.19.100.136:5000/api/authentication/logout");
    navigate("/");
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          bottom: "93%",
          right: 16,
          borderRadius: "7%",
          padding: 2,
          boxShadow: 3,
        }}
        onClick={handleLogOut}
      >
        Logout
      </Button>
      <form onSubmit={handleSubmit(handleEncy)}>
        <Grid2 container gap={10} sx={{ mt: "-18%", ml: 7 }}>
          {/* Left Box */}
          <Grid2
            sx={{ background: "white", padding: "20px", borderRadius: "10px" }}
          >
            <Controller
              control={control}
              name="qvantum"
              render={({ field }) => (
                <TextField {...field} fullWidth sx={{ mb: 2 }} />
              )}
            />
            <Controller
              control={control}
              name="message1"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="enter message"
                  fullWidth
                  multiline
                  rows={10}
                />
              )}
            />

            <Button
              variant="contained"
              sx={{ background: "red", mt: 2 }}
              type="submit"
            >
              Encypt
            </Button>
          </Grid2>

          {/* Right Box */}
          <Grid2
            sx={{ background: "white", padding: "20px", borderRadius: "10px" }}
          >
            <Controller
              control={control}
              name="code1"
              render={({ field }) => (
                <AceEditor
                  {...field}
                  value={JSON.stringify(resp, null, 2)}
                  width="560px"
                  mode={"javascript"}
                  theme="monokai"
                  fontSize={"15px"}
                  name="code_editor"
                  height="340px"
                  editorProps={{ $blockScrolling: true }}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </form>

      {/* {//////////////////////////////////////////////////////} */}

      <form onSubmit={handleSubmit(handleDeyc)}>
        <Grid2 container gap={10} sx={{ mt: "10px", ml: 6 }}>
          {/* Right Box */}
          <Grid2
            sx={{ background: "white", padding: "20px", borderRadius: "10px" }}
          >
            <Controller
              control={control}
              name="code2"
              render={({ field }) => (
                <AceEditor
                  {...field}
                  width="560px"
                  mode={"javascript"}
                  theme="monokai"
                  name="code_editor"
                  height="340px"
                  editorProps={{ $blockScrolling: true }}
                />
              )}
            />
            <Button
              variant="contained"
              sx={{ background: "red", mt: 2 }}
              type="submit"
            >
              Decrypt
            </Button>
          </Grid2>

          {/* Left Box */}
          <Grid2
            sx={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
            }}
          >
            <Controller
              control={control}
              name=""
              render={({ field }) => (
                <TextField disabled {...field} fullWidth sx={{ mb: 2 }} />
              )}
            />

            <Controller
              control={control}
              name="message2"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={JSON.stringify(decData)}
                  placeholder="enter message"
                  fullWidth
                  multiline
                  rows={10}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default Encryot;

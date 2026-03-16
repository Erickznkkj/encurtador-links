const supabase = require("./supabase")
const gerarCodigo = require("./codificador")
const express = require("express")

const router = express.Router()

router.post("/encurta", async (req, res) => {

  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: "URL obrigatória" })
  }

  const code = gerarCodigo()

  const { data, error } = await supabase
    .from("links")
    .insert([
      {
        scode: code,
        url_origin: url
      }
    ])

  if (error) {
    return res.status(500).json({ error: "Erro ao salvar" })
  }

  res.json({
    short_url: `http://localhost:3000/${code}`
  })

})

router.get("/:code", async (req, res) => {

  const code = req.params.code;

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("scode", code)
    .single()

  if (!data) {
    return res.status(404).send("Link não encontrado")
  }
  await supabase
    .from("links")
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq("scode", code)

    
  res.redirect(data.url_origin)

})

module.exports = router
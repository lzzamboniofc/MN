# MN Beauty — versão completa

Site responsivo para designer de sobrancelhas com editor visual local.

## Abrir

Use um servidor local para que a prévia funcione sem restrições:

```bash
python -m http.server 8000
```

Depois abra:

- Site: `http://localhost:8000/index.html`
- Editor: `http://localhost:8000/editor.html`

## Recursos

- conteúdo completo editável;
- imagens com upload e compressão;
- serviços, galeria, depoimentos, FAQ, horários e indicadores dinâmicos;
- reordenação e remoção de itens;
- tema claro/escuro, fontes, cores, bordas e animações;
- WhatsApp, Instagram, TikTok, Facebook, Pinterest, Threads e Google Maps;
- prévia desktop, tablet e celular;
- importação e exportação em JSON;
- armazenamento local no navegador.

## Limite desta versão

O `localStorage` é adequado para protótipos e uso em um único navegador. Como imagens ocupam espaço, o editor comprime os arquivos. Para uso comercial em múltiplos dispositivos, conecte o projeto a um backend, banco de dados e armazenamento de imagens.

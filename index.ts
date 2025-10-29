import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function adicionarMusica() {
  console.log('\n╔══════════════════════════════╗');
  console.log('║ 🎵  1. Adicionar Nova Música ║');
  console.log('╚══════════════════════════════╝');
  
  const nome = await askQuestion('Nome da música: ');
  const banda = await askQuestion('Nome da banda: ');
  const produtora = await askQuestion('Produtora (opcional): ');

  try {
    const novaMusica = await prisma.musica.create({
      data: {
        nome: nome,
        banda: banda,
        produtora: produtora || null
      }
    });
    console.log(`\n✅ Música "${novaMusica.nome}" (ID: ${novaMusica.id}) cadastrada!`);
  } catch (e) {
    console.error('\n❌ Erro ao cadastrar música:', e);
  }
}

async function verMusicas(mostrarTitulo = true) {
  if (mostrarTitulo) {
    console.log('\n╔═════════════════════════════════╗');
    console.log('║ 🎶  2. Ver Músicas Cadastradas  ║');
    console.log('╚═════════════════════════════════╝');
  }

  try {
    const musicas = await prisma.musica.findMany();

    if (musicas.length === 0) {
      console.log('\nℹ️   Nenhuma música cadastrada no banco de dados.');
      return;
    }

    console.log('\n----------- LISTA DE MÚSICAS -----------');
    for (const musica of musicas) {
      console.log(
        `[ID: ${musica.id}] ${musica.nome} - ${musica.banda} (Prod: ${musica.produtora || 'N/A'})`
      );
    }
    console.log('----------------------------------------');
    
  } catch (e) {
    console.error('\n❌ Erro ao buscar músicas:', e);
  }
}

async function deletarMusica() {
  console.log('\n╔══════════════════════════╗');
  console.log('║ 🗑️   3. Deletar Música    ║');
  console.log('╚══════════════════════════╝');
  
  // Mostra a lista de músicas para o usuário saber qual ID escolher
  await verMusicas(false);

  // Verifica se há músicas antes de perguntar qual deletar
  const totalMusicas = await prisma.musica.count();
  if (totalMusicas === 0) {
    console.log('\nℹ️   Não há músicas para deletar.');
    return;
  }

  const idString = await askQuestion('\nDigite o ID da música que deseja deletar: ');
  const id = parseInt(idString, 10);

  if (isNaN(id)) {
    console.log('\n❌ ID inválido. Deve ser um número.');
    return;
  }

  try {
    const musicaDeletada = await prisma.musica.delete({
      where: { id: id },
    });
    console.log(`\n✅ Música "${musicaDeletada.nome}" (ID: ${id}) foi deletada.`);
  } catch (e) {
    // Erro P2025: "Record to delete does not exist"
    console.error(`\n❌ Erro ao deletar: Não foi encontrada música com ID ${id}.`);
  }
}

async function menuPrincipal() {
  while (true) {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║        Consulta de Músicas v1.0        ║');
    console.log('╠══════════════════════════════════════════╣');
    console.log('║                                          ║');
    console.log('║  1. 🎵  Adicionar música                 ║');
    console.log('║  2. 🎶  Ver todas as músicas             ║');
    console.log('║  3. 🗑️   Deletar uma música                ║');
    console.log('║                                          ║');
    console.log('║  0. 🚪  Sair                             ║');
    console.log('║                                          ║');
    console.log('╚══════════════════════════════════════════╝');

    const opcao = await askQuestion('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        await adicionarMusica();
        break;
      case '2':
        await verMusicas();
        break;
      case '3':
        await deletarMusica();
        break;
      case '0':
        return;
      default:
        console.log('\n❌ Opção inválida! Tente novamente.');
    }
    
    // Pequena pausa antes de limpar o console e mostrar o menu novamente
    await askQuestion('\nPressione ENTER para continuar...');
    // Limpa o console para o menu aparecer sempre no topo
    console.clear();
  }
}

async function start() {
  console.clear(); // Limpa o console na inicialização
  try {
    await menuPrincipal();
  } catch (e) {
    console.error('Um erro inesperado ocorreu na aplicação:', e);
  } finally {
    console.log('\n👋 Saindo... Desconectando do banco de dados.');
    await prisma.$disconnect();
    rl.close();
  }
}

start();
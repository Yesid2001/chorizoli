interface Usuario {
    id: number;
    nombre: string;
}

// CLASE REPOSITORIO
class Repositorio {

    private usuarios: Usuario[] = [];

    save(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    find(): Usuario[] {
        return this.usuarios;
    }

    findOne(id: number): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const usuario = this.usuarios.find(u => u.id === id);

                if (usuario) {
                    resolve(usuario);
                } else {
                    reject('Usuario no encontrado');
                }
            }, 2000);
        });
    }
}

// USO
const repo = new Repositorio();

repo.save({ id: 1, nombre: 'Juan' });
repo.save({ id: 2, nombre: 'Maria' });

console.log('Todos:', repo.find());

repo.findOne(2)
    .then((usuario) => {
        console.log('Encontrado:', usuario);
    })
    .catch((error) => {
        console.log('Error:', error);
    })
    .finally(() => {
        console.log('Finalizó');
    });
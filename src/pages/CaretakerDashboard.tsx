import React from 'react';

export default function CaretakerDashboard(): React.JSX.Element {
	return (
		<div className="p-8 bg-green-50 min-h-screen">
			<h2 className="text-2xl font-semibold mb-4">
				Panel de Cuidador 🐕
			</h2>
			<ul className="space-y-4">
				<li className="p-4 bg-white rounded-xl shadow">
					📅 Mi calendario de disponibilidad
				</li>
				<li className="p-4 bg-white rounded-xl shadow">
					📖 Historial de servicios
				</li>
				<li className="p-4 bg-white rounded-xl shadow">
					⚙️ Editar perfil
				</li>
			</ul>
		</div>
	);
};

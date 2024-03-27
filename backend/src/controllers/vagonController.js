const VagonModel = require('../../models/vagon');

module.exports = {
    getAll: async (req, res) => {
        try {
            const { depo, vagonType, repairType, ownerCompany, owner } = req.query

            // Construct the query object based on provided parameters
            const query = {
                status: 'remain',
                ...(depo && depo !== "O'zvagonta'mir" && { depo }),
                ...(vagonType && { vagon_type: vagonType }),
                ...(repairType && { repair_type: repairType }),
                ...(ownerCompany && { owner_company_id: ownerCompany }), 
                ...(owner && { owner_id: owner })
            };
    
            // Now you can use the constructed query object in your logic
            let models = await VagonModel.find(query).populate('owner_id', 'name').populate('owner_company_id', 'name');
            res.send(models);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await VagonModel.findById(req.params.id);

            if (!model) {
                return res.status(404).json({ message: `${req.params.id} id record not found` });
            }

            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {

            let model = await VagonModel.create({
                ...req.body,
                status: 'remain',
            });

            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                nomer,
                vagon_type,
                repair_type,
                owner_id,
                owner_company_id,
                year,
                depo,
                remain_comment,
            } = req.body;
            
            let updatedModel = await VagonModel.findByIdAndUpdate(
                id,
                {
                    nomer,
                    vagon_type,
                    repair_type,
                    owner_id,
                    owner_company_id,
                    year,
                    depo,
                    remain_comment,
                    status: 'remain'
                },
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'VagonModel not found' });
            }

            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            let deletedModel = await VagonModel.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'VagonModel not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    generateRemainVagonTable: async (req, res) => {
        try {
            const depoList = [
                {name: 'VCHD-3'}, 
                {name: 'VCHD-5'}, 
                {name: 'VCHD-6'}
            ]
            const vagonTypes = [
                {name: 'Yopiq vagon (крыт)'}, 
                {name: 'Platforma (пф)'}, 
                {name: 'Yarim ochiq vagon (пв)'}, 
                {name: 'Sisterna (цс)'}, 
                {name: 'Boshqa turdagi (проч)'}
            ]
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
            const row = [vagonType.name];
            let totalVagonCount = 0;

            for (const depo of depoList) {
                const vagonCount = await VagonModel.countDocuments({
                vagon_type: vagonType.name,
                depo: depo.name,
                status: 'remain'
                });

                row.push(vagonCount);
                totalVagonCount += vagonCount;
            }

            row.push(totalVagonCount);
                tableData.push(row);
            }

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    generateRepairedVagonTableDr: async (req, res) => {
        try {
            const depoList = [
                {name: 'VCHD-3'}, 
                {name: 'VCHD-5'}, 
                {name: 'VCHD-6'}
            ]
            const vagonTypes = [
                {name: 'Yopiq vagon (крыт)'}, 
                {name: 'Platforma (пф)'}, 
                {name: 'Yarim ochiq vagon (пв)'}, 
                {name: 'Sisterna (цс)'}, 
                {name: 'Boshqa turdagi (проч)'}
            ]
            
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
                const row = [vagonType.name];
                let totalVagonCount = 0;
                for (const depo of depoList) {
                    const vagonCount = await VagonModel.countDocuments({
                    vagon_type: vagonType.name,
                    depo: depo.name,
                    status: 'repaired',
                    repair_type: 'Depoli ta\'mir (ДР)'
                    });

                    row.push(vagonCount);
                    totalVagonCount += vagonCount;
                }

                row.push(totalVagonCount);
                tableData.push(row);
            }

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
    generateRepairedVagonTableKr: async (req, res) => {
        try {
            const depoList = [
                {name: 'VCHD-3'}, 
                {name: 'VCHD-5'}, 
                {name: 'VCHD-6'}
            ]
            const vagonTypes = [
                {name: 'Yopiq vagon (крыт)'}, 
                {name: 'Platforma (пф)'}, 
                {name: 'Yarim ochiq vagon (пв)'}, 
                {name: 'Sisterna (цс)'}, 
                {name: 'Boshqa turdagi (проч)'}
            ]
            
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
                const row = [vagonType.name];
                let totalVagonCount = 0;
                for (const depo of depoList) {
                    const vagonCount = await VagonModel.countDocuments({
                    vagon_type: vagonType.name,
                    depo: depo.name,
                    status: 'repaired',
                    repair_type: 'Kapital ta\'mir (КР)'
                    });

                    row.push(vagonCount);
                    totalVagonCount += vagonCount;
                }

                row.push(totalVagonCount);
                tableData.push(row);
            }

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
    generateRepairedVagonTableKrp: async (req, res) => {
        try {
            const depoList = [
                {name: 'VCHD-3'}, 
                {name: 'VCHD-5'}, 
                {name: 'VCHD-6'}
            ]
            const vagonTypes = [
                {name: 'Yopiq vagon (крыт)'}, 
                {name: 'Platforma (пф)'}, 
                {name: 'Yarim ochiq vagon (пв)'}, 
                {name: 'Sisterna (цс)'}, 
                {name: 'Boshqa turdagi (проч)'}
            ]
            
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
                const row = [vagonType.name];
                let totalVagonCount = 0;
                for (const depo of depoList) {
                    const vagonCount = await VagonModel.countDocuments({
                    vagon_type: vagonType.name,
                    depo: depo.name,
                    status: 'repaired',
                    repair_type: 'KPR (КРП)'
                    });

                    row.push(vagonCount);
                    totalVagonCount += vagonCount;
                }

                row.push(totalVagonCount);
                tableData.push(row);
            }

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
    generateRepairedVagonTableTo3: async (req, res) => {
        try {
            const depoList = [
                {name: 'VCHD-3'}, 
                {name: 'VCHD-5'}, 
                {name: 'VCHD-6'}
            ]
            const vagonTypes = [
                {name: 'Yopiq vagon (крыт)'}, 
                {name: 'Platforma (пф)'}, 
                {name: 'Yarim ochiq vagon (пв)'}, 
                {name: 'Sisterna (цс)'}, 
                {name: 'Boshqa turdagi (проч)'}
            ]
            
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
                const row = [vagonType.name];
                let totalVagonCount = 0;
                for (const depo of depoList) {
                    const vagonCount = await VagonModel.countDocuments({
                    vagon_type: vagonType.name,
                    depo: depo.name,
                    status: 'repaired',
                    repair_type: 'TO-3'
                    });

                    row.push(vagonCount);
                    totalVagonCount += vagonCount;
                }

                row.push(totalVagonCount);
                tableData.push(row);
            }

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
};

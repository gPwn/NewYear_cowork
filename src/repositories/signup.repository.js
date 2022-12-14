





        const user = await Users.findAll ({
            attributes: ["userId"],
            where: {loginId},
        })

        

        await Users.create({ loginId, nickname, password });